import { CommentData } from "@src/types/detail";

// 그룹별로 묶기 (댓글과 대댓글 묶기)
export const groupByComments = (
  sortComments: CommentData[],
  handleCommentDatas: (newComment: CommentData[][]) => void
) => {
  const newComment: CommentData[][] = [];
  sortComments.forEach((comment) => {
    const group = comment.attributes.group;
    if (!newComment[group]) newComment[group] = [comment];
    else newComment[group] = [...newComment[group], comment];
  });
  handleCommentDatas(newComment);
  return newComment;
};
