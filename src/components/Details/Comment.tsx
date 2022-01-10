import styled from "@emotion/styled";
import Link from "next/link";
import { CommentUser } from "./CommentUser";
import { PALLETS_LIGHT } from "../../constants";

export const Comment = () => {
  const comment = {
    id: 0,
    user: [
      {
        id: 0,
        email: "손님@gmail.com",
        nickname: "손님",
        comment: "좋은글 감사합니다!!",
        src: "./image/sampleUser.jpg",
        other: [
          {
            id: 0,
          },
          {
            id: 1,
          },
        ],
      },
      {
        id: 1,
        email: "글쓴이@gmail.com",
        nickname: "글쓴이",
        comment: "별말씀을요!",
        src: "./image/sampleUser2.jpg",
        other: [],
      },
    ],
  };

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <CommentForm action="">
        <CommentNum>{comment.user.length}개의 댓글</CommentNum>
        <TextArea name="댓글 입력" placeholder="댓글을 작성하세요"></TextArea>
        <BtnContainer>
          <CommentBtn type="submit">댓글 작성</CommentBtn>
        </BtnContainer>
      </CommentForm>
      {comment.user.map((User) => {
        return <CommentUser key={`CommentUser-${User.id}`} user={User} />;
      })}
    </article>
  );
};

const CommentForm = styled.form`
  width: 100%;
`;
const CommentNum = styled.h4`
  font-size: 18px;
  margin: 24px 0;
`;
const TextArea = styled.textarea`
  resize: none;
  padding: 20px 20px 30px;
  outline: none;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  margin-bottom: 1.5rem;
  width: 95%;
  border-radius: 4px;
  min-height: 90px;
  font-size: 16px;
  color: ${PALLETS_LIGHT.MAIN_FONT};
  line-height: 1.75;
  ::placeholder {
    color: ${PALLETS_LIGHT.ICON};
  }
`;
const BtnContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  padding-left: 45px;
`;
const CommentBtn = styled.button`
  font-weight: bold;
  cursor: pointer;
  background: ${PALLETS_LIGHT.MAIN};
  color: white;
  border-radius: 4px;
  padding: 0px 20px;
  height: 32px;
  font-size: 16px;
  :hover {
    opacity: 0.9;
  }
`;
