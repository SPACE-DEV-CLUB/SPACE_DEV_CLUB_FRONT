import styled from "@emotion/styled";

export const Comment = () => {
  const comment = {
    id: 0,
    user: [
      {
        id: 0,
        email: "손님@gmail.com",
        comment: "좋은글 감사합니다!!",
      },
      {
        id: 1,
        email: "글쓴이@gmail.com",
        comment: "별말씀을요!",
      },
    ],
  };

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <form action="">
        <CommentNum>{comment.user.length}개의 댓글</CommentNum>
        <TextArea name="댓글 입력" placeholder="댓글을 작성하세요" />
        <button type="submit">댓글 작성</button>
      </form>
    </article>
  );
};

const CommentNum = styled.h4`
  font-size: 18px;
  margin: 24px 0;
`;
const TextArea = styled.textarea``;
