import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../../constants";

import { Theme } from "../../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../../pages/_app";

interface ThemeProps {
  theme: Theme;
}

export const CommentForm = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글 입력 폼</h3>
      <CommentF action="">
        <TextArea
          theme={theme}
          name="댓글 입력"
          placeholder="댓글을 작성하세요"
        ></TextArea>
        <BtnContainer>
          <CommentBtn theme={theme} type="submit">
            댓글 작성
          </CommentBtn>
        </BtnContainer>
      </CommentF>
    </article>
  );
};

const CommentF = styled.form`
  width: 100%;
`;
const TextArea = styled.textarea<ThemeProps>`
  resize: none;
  padding: 20px 20px 30px;
  outline: none;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};
  margin-bottom: 1.5rem;
  width: 95%;
  border-radius: 4px;
  min-height: 90px;
  font-size: 16px;
  color: ${({ theme }) => theme.SUB_FONT};
  line-height: 1.75;
  ::placeholder {
    color: ${PALLETS_LIGHT.ICON};
  }
`;
const BtnContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  padding-left: 45px;
`;
const CommentBtn = styled.button<ThemeProps>`
  font-weight: bold;
  cursor: pointer;
  background: ${({ theme }) => theme.MAIN};
  color: ${({ theme }) => theme.SUB};
  border-radius: 4px;
  padding: 0px 20px;
  height: 32px;
  font-size: 16px;
  :hover {
    opacity: 0.9;
  }
`;
