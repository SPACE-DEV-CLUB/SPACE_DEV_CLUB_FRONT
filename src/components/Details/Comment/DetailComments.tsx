import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import { CommentData } from "@src/types/detail";

import { CommentForm, ReCommentForm, CommentContainer } from ".";
import { PostStore } from "../Context";
import { useGetCommentData } from "./helper/CommentForm";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  loginUserId?: number;
}

export const DetailComments = ({ loginUserId }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postObj } = useContext(PostStore);

  const [_, setCommentForm] = useState(false);
  const { commentDatas, currentGroup, commentMoreBtn, onComment } =
    useGetCommentData();

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <CommentNum>{postObj.comments.data.length}개의 댓글</CommentNum>
      <CommentForm
        CommentOrder={0}
        loginUserId={loginUserId}
        CommentGroup={currentGroup}
        setCommentForm={setCommentForm}
        type="CommentCreate"
        CommentContent=""
        CommentId={0}
      />

      {commentDatas.map((group: CommentData[], i: number) => {
        return (
          <div key={`${i + 1}`}>
            {group.map((comment: CommentData) => {
              return (
                <div key={`CommentUser-${comment.id}`}>
                  <CommentContainer
                    comment={comment}
                    commentBtn={commentMoreBtn}
                    index={i}
                    loginUserId={loginUserId}
                  />
                </div>
              );
            })}
            {group.length > 1 && commentMoreBtn[i] === false && (
              <OnComment theme={theme} onClick={(e) => onComment(i)}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            )}
            {group.length < 2 && commentMoreBtn[i] === false && (
              <OnComment theme={theme} onClick={(e) => onComment(i)}>
                <BorderInnerIcon />
                댓글 남기기
              </OnComment>
            )}
            {commentMoreBtn[i] === true && (
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
  margin-bottom: 40px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
