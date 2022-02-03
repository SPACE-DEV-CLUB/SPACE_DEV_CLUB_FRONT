import styled from "@emotion/styled";
import Link from "next/link";

import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import { handleDate } from "../../utils/date";

interface ThemeProps {
  theme: Theme;
}

interface Comments {
  comments: {
    id: number;
    attributes: {
      userid: number;
      postid: number;
      content: string;
      createdAt: string;
      depth: number;
      order: number;
      group: number;
      is_deleted: boolean;
    };
  };
  userData: [
    {
      id: number;
      attributes: {
        nickname: string;
        profileimage: string;
      };
    }
  ];
}

let loginUserID = 1;
let user = {
  id: 0,
  attributes: {
    nickname: "",
    profileimage: "",
  },
};

export const CommentUser = ({ comments, userData }: Comments) => {
  const { theme } = useContext(ThemeContext);

  userData.some((data) => {
    if (data.id === comments.attributes.userid) {
      user = data;
      return true;
    }
  });

  return (
    <Container>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      <ProfileContainer>
        <Link href={user.attributes.nickname}>
          <a>
            <UserProfile
              src={user.attributes.profileimage}
              alt={`${user.attributes.nickname}프로필 사진`}
            />
          </a>
        </Link>
        <ProfileData>
          <Profile>
            <UserNickname>
              <Link href={user.attributes.nickname} passHref>
                <User theme={theme}>{user.attributes.nickname}</User>
              </Link>
            </UserNickname>
            {comments.attributes.userid === loginUserID && (
              <UDContainer>
                <Link href="#" passHref>
                  <UDItem theme={theme}>수정</UDItem>
                </Link>
                <Link href="#" passHref>
                  <UDItem theme={theme}>삭제</UDItem>
                </Link>
              </UDContainer>
            )}
          </Profile>
          <CreatedAt theme={theme}>
            {handleDate(comments.attributes.createdAt)}
          </CreatedAt>
        </ProfileData>
      </ProfileContainer>
      <CommentText>{comments.attributes.content}</CommentText>
      {/* {other.length === 0 ? (
        <div></div>
      ) : (
        <CommentPlus theme={theme}>
          <BorderInnerIcon className="comment-plus" />
          {other.length}개의 답글
        </CommentPlus>
      )} */}
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
`;
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
const UDItem = styled.a<ThemeProps>`
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
const CommentPlus = styled.div<ThemeProps>`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.MAIN};
  cursor: pointer;
  font-weight: 700;
  .comment-plus {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;
