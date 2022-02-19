import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import { ThemeOptions } from "@styles/theme";
import { ThemeContext } from "@pages/_app";

import BorderHorizontalIcon from "@mui/icons-material/BorderHorizontal";

import { CommentForm } from ".";

interface ThemeProps {
  theme: ThemeOptions;
}

interface Props {
  onComment: (index: number) => void;
  index: number;
  loginUserId?: number;
  CommentGroup: number;
  CommentOrder: number;
}

export const ReCommentForm = ({
  onComment,
  index,
  loginUserId,
  CommentGroup,
  CommentOrder,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const [commentForm, setCommentForm] = useState(false);
  const onCommentForm = () => {
    setCommentForm(!commentForm);
  };

  return (
    <div>
      {commentForm === false && (
        <ComCom theme={theme} onClick={onCommentForm}>
          답글 작성하기
        </ComCom>
      )}
      {commentForm === true && (
        <ComComContainer>
          <CommentForm
            CommentOrder={CommentOrder}
            loginUserId={loginUserId}
            CommentGroup={CommentGroup}
            setCommentForm={setCommentForm}
          />
          <CommentRemove theme={theme} onClick={onCommentForm}>
            취소
          </CommentRemove>
        </ComComContainer>
      )}
      <OnComment theme={theme} onClick={(e) => onComment(index)}>
        <BorderHorizontalIcon />
        숨기기
      </OnComment>
    </div>
  );
};

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
const ComCom = styled.div<ThemeProps>`
  cursor: pointer;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.MAIN};
  display: flex;
  color: ${({ theme }) => theme.SUB};
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: ${({ theme }) => theme.MAIN};
  margin-bottom: 20px;
`;
const ComComContainer = styled.div`
  position: relative;
`;
const CommentRemove = styled.div<ThemeProps>`
  position: absolute;
  bottom: 0;
  right: 110px;
  font-weight: bold;
  cursor: pointer;
  background: ${({ theme }) => theme.BUTTON_SUB};
  color: ${({ theme }) => theme.MAIN};
  border-radius: 4px;
  padding: 0px 15px;
  height: 32px;
  font-size: 16px;
  display: flex;
  align-items: center;
  width: 40px;
  :hover {
    opacity: 0.9;
  }
`;
