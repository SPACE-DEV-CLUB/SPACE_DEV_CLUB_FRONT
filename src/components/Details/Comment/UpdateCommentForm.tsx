import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import { CommentForm } from ".";

import { Theme } from "@styles/theme";
import { useContext } from "react";
import { ThemeContext } from "@pages/_app";
import { CommentData } from "@src/types/Detail";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  comment: CommentData;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  loginUserId?: number;
}

export const UpdateCommentForm = ({
  setIsUpdate,
  comment,
  loginUserId,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { order, group, content } = comment.attributes;

  const onClickCancel = () => {
    setIsUpdate(false);
  };

  return (
    <ComComContainer>
      <CommentForm
        CommentOrder={order}
        loginUserId={loginUserId}
        CommentGroup={group}
        setCommentForm={setIsUpdate}
        type="CommentUpdate"
        CommentContent={content}
        CommentId={comment.id}
      />
      <CommentRemove theme={theme} onClick={onClickCancel}>
        취소
      </CommentRemove>
    </ComComContainer>
  );
};

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
