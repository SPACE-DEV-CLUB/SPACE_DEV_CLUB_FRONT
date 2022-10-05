import { CommentData } from "@src/types/detail";

// 섞여 있는 댓글 데이터에서 group, depth, order 정렬
export const sortComments = (comments: CommentData[]) => {
  const sort = comments
    .sort((a, b) => a.attributes.order - b.attributes.order)
    .sort((a, b) => a.attributes.depth - b.attributes.depth)
    .sort((a, b) => a.attributes.group - b.attributes.group);
  return sort;
};
