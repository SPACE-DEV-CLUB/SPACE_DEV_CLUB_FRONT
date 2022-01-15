import styled from "@emotion/styled";
import { useState } from "react";
import { WriteHeader } from "./WriteHeader";
import { WriteForm } from "./WriteForm";
import { BottomMenu } from "./BottomMenu";
import { MDviewr } from "./MDViewer";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const EditorContainer = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  return (
    <>
      <EditorWrap>
        <EditorForm action="">
          <WriteHeader handleTitleChange={handleTitleChange} title={title} />
          <WriteForm
            handleTextAreaChange={handleTextAreaChange}
            contents={contents}
          />
        </EditorForm>
        <BottomMenu />
      </EditorWrap>
      <MDWrap>
        <MDviewr title={title} contents={contents} />
      </MDWrap>
    </>
  );
};

const EditorWrap = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
  height: 100%;
  background-color: #fff;

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
