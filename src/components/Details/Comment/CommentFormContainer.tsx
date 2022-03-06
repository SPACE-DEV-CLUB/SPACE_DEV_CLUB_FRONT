import styled from "@emotion/styled";

import { Theme } from "@styles/theme";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@pages/_app";

import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { CommentForm, ReCommentForm, CommentContainer } from ".";
import { PostContext } from "@src/pages/[id]/[details]";
import { CommentData } from "@src/types/Detail";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  loginUserId?: number;
}

export const CommentFormContainer = ({ loginUserId }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postObj } = useContext(PostContext);
  const [commentForm, setCommentForm] = useState(false);
  const [commentGroup, setCommentGroup] = useState(0);

  postObj.comments.data
    .sort((a, b) => a.attributes.order - b.attributes.order)
    .sort((a, b) => a.attributes.depth - b.attributes.depth)
    .sort((a, b) => a.attributes.group - b.attributes.group);

  let newComment: CommentData[][] = [];
  postObj.comments.data.forEach((comment) => {
    const group = comment.attributes.group;

    if (!newComment[group]) newComment[group] = [comment];
    else newComment[group] = [...newComment[group], comment];
  });

  useEffect(() => {
    if (newComment.length === 0) {
      setCommentGroup(1);
    } else {
      const groupNum =
        newComment[newComment.length - 1][0].attributes.group + 1;
      setCommentGroup(groupNum);
    }
  }, [newComment]);

  const [commentBtn, setCommentBtn] = useState(
    Array(newComment.length).fill(false)
  );

  const onComment = (i: number) => {
    commentBtn[i] = !commentBtn[i];
    setCommentBtn([...commentBtn]);
  };

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <CommentNum>{postObj.comments.data.length}개의 댓글</CommentNum>
      <CommentForm
        CommentOrder={0}
        loginUserId={loginUserId}
        CommentGroup={commentGroup}
        setCommentForm={setCommentForm}
        type="CommentCreate"
        CommentContent=""
        CommentId={0}
      />

      {newComment.map((group: CommentData[], i: number) => {
        return (
          <div key={`${i + 1}`}>
            {group.map((comment: CommentData) => {
              return (
                <div key={`CommentUser-${comment.id}`}>
                  <CommentContainer
                    comment={comment}
                    commentBtn={commentBtn}
                    index={i}
                    loginUserId={loginUserId}
                  />
                </div>
              );
            })}
            {group.length > 1 && commentBtn[i] === false && (
              <OnComment theme={theme} onClick={(e) => onComment(i)}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            )}
            {group.length < 2 && commentBtn[i] === false && (
              <OnComment theme={theme} onClick={(e) => onComment(i)}>
                <BorderInnerIcon />
                댓글 남기기
              </OnComment>
            )}
            {commentBtn[i] === true && (
              <ReCommentForm
                onComment={onComment}
                index={i}
                loginUserId={loginUserId}
                CommentGroup={i}
                CommentOrder={group[group.length - 1].attributes.order + 1}
              />
            )}
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
