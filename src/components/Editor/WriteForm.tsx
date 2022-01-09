import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PALLETS_LIGHT } from "../../constants";
import { ToolBar } from "./ToolBar";

interface WriteFormProps {
  handleTextAreaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  contents: string;
}

export const WriteForm = ({
  handleTextAreaChange,
  contents,
}: WriteFormProps) => {
  return (
    <Container>
      <ToolBar />
      <ContentsArea
        onChange={handleTextAreaChange}
        value={contents}
        placeholder="당신의 이야기를 적어보세요..."
        name=""
        id=""
      />
    </Container>
  );
};

const Container = styled.article`
  height: calc(100% - 250px);
`;

const ContentsArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  resize: none;
  height: calc(100% - 64px);
  border: none;
  width: 100%;
  padding: 0 48px;
  font-size: 18px;
  line-height: 27px;

  ::placeholder {
    font-style: italic;
  }

  :focus {
    outline: none;
  }
`;
