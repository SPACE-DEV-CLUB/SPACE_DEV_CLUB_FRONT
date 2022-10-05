import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import BorderInnerIcon from "@mui/icons-material/BorderInner";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import { CommentData } from "@src/types/detail";

import { CommentForm, ReCommentForm, CommentContainer } from ".";
import { PostStore } from "../Context";
import {
  sortComments,
  groupByComments,
  currentCommentGroup,
} from "./helper/DetailComments";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  loginUserId?: number;
}

export const DetailComments = ({ loginUserId }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postObj } = useContext(PostStore);
  const [commentDatas, setCommentDatas] = useState<CommentData[][]>([]);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [commentMoreBtn, setCommentMoreBtn] = useState<boolean[]>([]);

  const [commentForm, setCommentForm] = useState(false);

  const handleCommentDatas = (newComment: CommentData[][]) => {
    setCommentDatas(newComment);
  };

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

  useEffect(() => {
    const sortCommetnsData = sortComments(postObj.comments.data);
    const newComment = groupByComments(sortCommetnsData, handleCommentDatas);
    currentCommentGroup(newComment, handleCurrentCommentGroup);
    commentMoreBtnInit(newComment);
  }, []);

  const onComment = (i: number) => {
    commentMoreBtn[i] = !commentMoreBtn[i];
    setCommentMoreBtn([...commentMoreBtn]);
  };

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
