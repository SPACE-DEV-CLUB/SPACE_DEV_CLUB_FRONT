import styled from "@emotion/styled";
import Link from "next/link";

import { Theme } from "@styles/theme";
import { useContext, useState } from "react";
import { ThemeContext } from "@pages/_app";

import { handleDate } from "@utils/date";
import { CommentData, CommentUser, DeleteModel } from ".";
import { UpdateCommentForm } from "./UpdateCommentForm";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  comment: CommentData;
  user: CommentUser;
  loginUserId?: number;
}

export const Comment = ({ comment, user, loginUserId }: Props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { userid, profileimage } = user.attributes;
  const {
    userid: Cuserid,
    createdAt: CcreatedAt,
    content: Ccontent,
  } = comment.attributes;

  const { theme } = useContext(ThemeContext);

  const onClickDelete = () => {
    setIsDelete(true);
    document.body.style.overflow = "hidden";
  };

  const onClickUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <div>
      <ProfileContainer>
        <Link href={`/${userid}`}>
          <a>
            <UserProfile src={profileimage} alt={`${userid}프로필 사진`} />
          </a>
        </Link>
        <ProfileData>
          <Profile>
            <UserNickname>
              <Link href={`/${userid}`} passHref>
                <User theme={theme}>{userid}</User>
              </Link>
            </UserNickname>
            {Cuserid === loginUserId && !isUpdate && (
              <UDContainer>
                <UDItem onClick={onClickUpdate} type="button" theme={theme}>
                  수정
                </UDItem>
                <UDItem onClick={onClickDelete} type="button" theme={theme}>
                  삭제
                </UDItem>
              </UDContainer>
            )}
          </Profile>
          <CreatedAt theme={theme}>{handleDate(CcreatedAt)}</CreatedAt>
        </ProfileData>
      </ProfileContainer>
      {isUpdate && (
        <UpdateCommentForm
          loginUserId={loginUserId}
          comment={comment}
          setIsUpdate={setIsUpdate}
        />
      )}
      {!isUpdate && <CommentText>{Ccontent}</CommentText>}
      {isDelete && <DeleteModel setIsDelete={setIsDelete} comment={comment} />}
    </div>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
`;
const UserProfile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  margin-right: 10px;
`;
const ProfileData = styled.div`
  width: 85%;
  line-height: 1;
  margin-top: 18px;
`;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserNickname = styled.p`
  font-weight: 700;
  :hover {
    opacity: 0.9;
    text-decoration: underline;
  }
`;
const UDContainer = styled.div``;
const UDItem = styled.button<ThemeProps>`
  color: ${({ theme }) => theme.ICON};
  font-weight: 500;
  margin-right: 7px;
  &:hover {
    color: ${({ theme }) => theme.SUB_FONT};
  }
`;
const User = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
`;
const CreatedAt = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  margin-top: 8px;
  font-size: 13px;
`;
const CommentText = styled.div`
  font-size: 19px;
  margin: 30px 0 60px 0;
`;
