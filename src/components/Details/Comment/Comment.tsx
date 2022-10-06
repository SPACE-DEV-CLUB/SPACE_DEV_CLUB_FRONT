import styled from "@emotion/styled";
import { useContext, useState } from "react";
import Link from "next/link";
import { useSWRConfig } from "swr";
import axios, { Method } from "axios";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import { handleDate } from "@utils/date";
import { API_ENDPOINT } from "@src/constants";
import { CommentData, CommentUser } from "@src/types/detail";
import { Modal } from "@src/components/Common/Modal";

import { PostStore } from "../Context";
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
  const { postObj, postid } = useContext(PostStore);
  const { mutate } = useSWRConfig();
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
  };

  const onClickUpdate = () => {
    setIsUpdate(true);
  };

  const commentDelete = async (id: number) => {
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/comments/${id}`,
    });
    mutate(`${API_ENDPOINT}/comments?populate=*&filters[posts][id]=${postid}`);
  };

  const onClickCancle = () => {
    setIsDelete(false);
    document.body.style.overflow = "unset";
  };

  const deleteCommentAll = async () => {
    if (comment.attributes.depth === 0) {
      const everyComment = postObj.comments.data.filter(
        (group) => group.attributes.group === comment.attributes.group
      );
      everyComment.forEach((data) => commentDelete(data.id));
    } else {
      await commentDelete(comment.id);
    }
    document.body.style.overflow = "unset";
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
      {isDelete && (
        <Modal
          title="댓글 삭제"
          handleOK={deleteCommentAll}
          check={isDelete}
          handleCancel={onClickCancle}
        >
          댓글을 정말로 삭제하시겠습니까?
        </Modal>
      )}
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
  line-height: 30px;
  margin: 30px 0 60px 0;
`;
