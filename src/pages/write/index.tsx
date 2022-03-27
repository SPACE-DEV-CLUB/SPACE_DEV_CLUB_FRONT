import styled from "@emotion/styled";
import type { NextPage } from "next";
import { EditorContainer } from "../../components/Editor/EditorContainer";

const Editor: NextPage = () => {
  return (
    <Container>
      <h1 className="sr-only">Editor</h1>
      <EditorContainer DetailData={null} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default Editor;
