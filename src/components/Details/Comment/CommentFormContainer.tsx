import styled from "@emotion/styled";

import { Theme } from "../../../styles/theme";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../pages/_app";

import { useData } from "../../../hooks/useData";

import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { CommentForm, ComComForm, CommentContainer } from ".";

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
  }[];
}

interface Comment {
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
}

export const CommentFormContainer = ({ comments }: Comments) => {
  const { theme } = useContext(ThemeContext);

  comments.sort((a, b) => {
    return a.attributes.group < b.attributes.group
      ? -1
      : a.attributes.group > b.attributes.group
      ? 1
      : a.attributes.depth < b.attributes.depth
      ? -1
      : a.attributes.depth > b.attributes.depth
      ? 1
      : a.attributes.order < b.attributes.order
      ? -1
      : a.attributes.order > b.attributes.order
      ? 1
      : 0;
  });

  const [commentBtn, setCommentBtn] = useState(false);
  const onComment = () => {
    setCommentBtn(!commentBtn);
  };

  let newComment: any = [];
  comments.map((comment) => {
    const group = comment.attributes.group;
    if (!newComment[group]) newComment[group] = [comment];
    else newComment[group] = [...newComment[group], comment];
  });

  const { data: userData, error: UserError } = useData("userinfos");

  if (!userData) return <div>로딩중</div>;
  if (UserError) return <div>에러</div>;

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <CommentNum>{comments.length}개의 댓글</CommentNum>
      <CommentForm />

      {newComment.map((group: [], i: number) => {
        return (
          <div key={`${i + 1}`}>
            {group.map((comments: Comment) => {
              return (
                <div key={`CommentUser-${comments.id}`}>
                  <CommentContainer
                    comments={comments}
                    userData={userData.data}
                    commentBtn={commentBtn}
                  />
                </div>
              );
            })}
            {/* {group.length === 0 && (
              <OnComment theme={theme} onClick={onComment}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            )} */}
            {/* {group.length > 1 && commentBtn === false ? (
              <OnComment theme={theme} onClick={onComment}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            ) : (
              <ComComForm onComment={onComment} />
            )} */}
            {group.length > 1 && commentBtn === false && (
              <OnComment theme={theme} onClick={onComment}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            )}
            {group.length < 2 && commentBtn === false && (
              <OnComment theme={theme} onClick={onComment}>
                <BorderInnerIcon />
                댓글 남기기
              </OnComment>
            )}
            {commentBtn === true && <ComComForm onComment={onComment} />}
          </div>
        );
      })}
    </article>
  );
};

const CommentNum = styled.h4`
  font-size: 18px;
  margin: 24px 0;
`;
const OnComment = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.MAIN};
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
