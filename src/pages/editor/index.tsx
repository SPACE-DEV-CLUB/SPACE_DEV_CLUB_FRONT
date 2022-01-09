import styled from "@emotion/styled";
import type { NextPage } from "next";
import { KeyboardEvent } from "react";
import { Tag } from "../../components/Common/Tag";
import { useState } from "react";
import { MDviewr } from "../../components/Editor/MDViewer";
import { BottomMenu } from "../../components/Editor/BottomMenu";
import { ToolBar } from "../../components/Editor/ToolBar";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { WriteForm } from "../../components/Editor/WriteForm";
import { WriteHeader } from "../../components/Editor/WriteHeader";

const Editor: NextPage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    console.log(`title`, title);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    console.log(`contents`, contents);
  };

  return (
    <Container>
      <EditorWrap>
        <h1 className="sr-only">Editor</h1>
        <EditorForm action="">
          <WriteHeader handleTitleChange={handleTitleChange} title={title} />
          <WriteForm
            handleTextAreaChange={handleTextAreaChange}
            contents={contents}
          />
        </EditorForm>
        x
        <BottomMenu />
      </EditorWrap>
      <MDWrap>
        <MDviewr title={title} contents={contents} />
      </MDWrap>
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

const EditorWrap = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
  height: 100%;

  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    width: 100%;
    right: 0;
  }
`;

const EditorForm = styled.form`
  height: 100%;
`;

const MDWrap = styled.article`
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  padding: 48px;
  background-color: #fcfdfc;
  word-break: break-all;

  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
`;

export default Editor;
