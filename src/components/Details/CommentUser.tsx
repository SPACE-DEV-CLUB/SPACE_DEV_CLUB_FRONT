import styled from "@emotion/styled";
import Link from "next/link";

import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import { handleDate } from "../../utils/dateLogic";

interface ThemeProps {
  theme: Theme;
}

interface User {
  user: {
    id: number;
    email: string;
    nickname: string;
    comment: string;
    src: string;
    other: { id: number }[];
    createdAt: string;
  };
}

export const CommentUser = ({ user }: User) => {
  const { theme } = useContext(ThemeContext);
  const { email, nickname, src, comment, other, createdAt } = user;

  return (
    <article>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      <div>
        <ProfileContainer>
          <Link href={email}>
            <a>
              <UserProfile src={src} alt={`${email}프로필 사진`} />
            </a>
          </Link>
          <ProfileData>
            <UserNickname>
              <Link href={email}>
                <User theme={theme}>{nickname}</User>
              </Link>
            </UserNickname>
            <CreatedAt theme={theme}>{handleDate(createdAt)}</CreatedAt>
          </ProfileData>
        </ProfileContainer>
      </div>
      <CommentText>{comment}</CommentText>
      {other.length === 0 ? (
        <div></div>
      ) : (
        <CommentPlus theme={theme}>
          <BorderInnerIcon className="comment-plus" />
          {other.length}개의 답글
        </CommentPlus>
      )}
    </article>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;
const UserProfile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;
const ProfileData = styled.div`
  margin-left: 1rem;
  line-height: 1;
  margin-top: 18px;
`;
const UserNickname = styled.p`
  font-weight: 700;
  :hover {
    opacity: 0.9;
    text-decoration: underline;
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
