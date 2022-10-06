import { useData } from "@src/hooks";
import { useContext, useEffect, useState } from "react";

import { PostStore } from "@src/components/Details/Context";
import { CommentData } from "@src/types/detail";

import {
  currentCommentGroup,
  groupByComments,
  sortComments,
} from "../DetailComments";

export const useGetCommentData = () => {
  const [commentLen, setCommentLen] = useState(0);
  const [commentDatas, setCommentDatas] = useState<CommentData[][]>([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [commentMoreBtn, setCommentMoreBtn] = useState<boolean[]>([]);
  const { postid } = useContext(PostStore);
  const path = "comments";
  const query = `populate=*&filters[posts][id]=${postid}`;
  const { data: comments } = useData(path, query);

  // 댓글 입력 Form에서 현재 몇 번째 댓글인지 판단하여 생성 하기 위한 state 관리
  // ex) 댓글 3개 있으면 이번에 작성될 댓글 그룹은 4
  const handleCurrentCommentGroup = (groupNum: number) => {
    setCurrentGroup(groupNum);
  };

  // 댓글마다 더 보기 및 답글을 달기 위한 버튼이 존재
  // 댓글에 맞는 대댓글 UI만 펼쳐지기 위함
  const commentMoreBtnInit = (newComment: CommentData[][]) => {
    if (newComment) {
      const init = Array(newComment.length).fill(false);
      setCommentMoreBtn(init);
    }
  };

  const handleCommentDatas = (newComment: CommentData[][]) => {
    setCommentDatas(newComment);
  };

  const onComment = (i: number) => {
    commentMoreBtn[i] = !commentMoreBtn[i];
    setCommentMoreBtn([...commentMoreBtn]);
  };

  useEffect(() => {
    if (comments) {
      setCommentLen(comments.data.length);
      const sortCommetnsData = sortComments(comments.data);
      const newComment = groupByComments(sortCommetnsData, handleCommentDatas);
      currentCommentGroup(newComment, handleCurrentCommentGroup);
      commentMoreBtnInit(newComment);
    }
  }, [comments]);

  return {
    commentDatas,
    currentGroup,
    commentMoreBtn,
    onComment,
    commentLen,
  };
};
