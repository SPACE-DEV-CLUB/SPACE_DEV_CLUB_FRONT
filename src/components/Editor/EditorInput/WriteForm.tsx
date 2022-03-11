import styled from "@emotion/styled";
import { ToolBar } from "./ToolBar";
import { useContext } from "react";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";
import { LinkInputModal } from "./LinkInputModal";

interface WriteFormProps {
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleLineStyle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleLinkModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCodeBox: any;
  handleDecoBtn: any;
  txtAreaCont: any;
  linkModal: boolean;
  contents: string;
}

export const WriteForm = ({
  handleTextAreaChange,
  handleDecoBtn,
  contents,
  txtAreaCont,
  handleLineStyle,
  handleCodeBox,
  handleLinkModal,
  linkModal,
}: WriteFormProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Container theme={theme}>
      <ToolBar
        handleLineStyle={handleLineStyle}
        handleDecoBtn={handleDecoBtn}
        handleCodeBox={handleCodeBox}
        handleLinkModal={handleLinkModal}
      />
      <label htmlFor="editorContents" className="sr-only">
        에디터 컨텐츠 입력란
      </label>
      <ContentsArea
        onChange={handleTextAreaChange}
        value={contents}
        placeholder="당신의 이야기를 적어보세요..."
        name="editorContents"
        id="editorContents"
        theme={theme}
        ref={txtAreaCont}
      />
      {linkModal && <LinkInputModal />}
    </Container>
  );
};

const Container = styled.article<ThemeProps>`
  height: calc(100% - 250px);
  color: ${({ theme }) => theme.MAIN_FONT};
  background-color: ${({ theme }) => theme.BACKGROUND};
`;

const ContentsArea = styled.textarea<ThemeProps>`
  display: block;
  box-sizing: border-box;
  resize: none;
  height: calc(100% - 64px);
  border: none;
  width: 100%;
  padding: 0 48px;
  font-size: 18px;
  line-height: 27px;
  color: ${({ theme }) => theme.MAIN_FONT};
  background-color: ${({ theme }) => theme.BACKGROUND};

  ::placeholder {
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;
