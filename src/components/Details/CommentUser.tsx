import styled from "@emotion/styled";
import Link from "next/link";

import BorderInnerIcon from "@mui/icons-material/BorderInner";
import { PALLETS } from "../../constants";

interface User {
  user: {
    id: number;
    email: string;
    nickname: string;
    comment: string;
    src: string;
    other: { id: number }[];
  };
}

export const CommentUser = ({ user }: User) => {
  return (
    <article>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      <div>
        <ProfileContainer>
          <Link href={user.email}>
            <a>
              <UserProfile src={user.src} alt="" />
            </a>
          </Link>
          <ProfileData>
            <UserNickname>
              <Link href={user.email}>
                <a>{user.nickname}</a>
              </Link>
            </UserNickname>
            <CreatedAt>4일 전</CreatedAt>
          </ProfileData>
        </ProfileContainer>
      </div>
      <CommentText>{user.comment}</CommentText>
      {user.other.length === 0 ? (
        <div></div>
      ) : (
        <CommentPlus>
          <BorderInnerIcon className="comment-plus" />
          {user.other.length}개의 답글
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
const CreatedAt = styled.p`
  color: rgb(134, 142, 150);
  margin-top: 8px;
  font-size: 13px;
`;
const CommentText = styled.div`
  font-size: 19px;
  margin: 30px 0 60px 0;
`;
const CommentPlus = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${PALLETS.MAIN};
  cursor: pointer;
  font-weight: 700;
  .comment-plus {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;
