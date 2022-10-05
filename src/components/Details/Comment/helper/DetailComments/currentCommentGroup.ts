import { CommentData } from "@src/types/detail";

// 댓글 입력 Form에서 현재 몇 번째 댓글인지 판단하여 생성 하기 위한 state 관리
// ex) 댓글 3개 있으면 이번에 작성될 댓글 그룹은 4
export const currentCommentGroup = (
  newComment: CommentData[][],
  handleCurrentCommentGroup: (groupNum: number) => void
) => {
  if (newComment.length === 0) {
    handleCurrentCommentGroup(1);
  } else {
    const groupNum = newComment[newComment.length - 1][0].attributes.group + 1;
    handleCurrentCommentGroup(groupNum);
  }
};
