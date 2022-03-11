import styled from "@emotion/styled";
import { marked } from "marked";
import editorStyle from "@src/styles/editorStyle";
import { ErrorPage } from "@components/Common/ErrorPage";

interface MDViewerProps {
  title: string;
  contents: string;
}
export const MDviewer = ({ title, contents }: MDViewerProps) => {
  marked.setOptions({ breaks: true, gfm: true });

  return (
    <ViewerWrap>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(contents) }} />
    </ViewerWrap>
  );
};

const ViewerWrap = styled.article`
  ${editorStyle}
`;
