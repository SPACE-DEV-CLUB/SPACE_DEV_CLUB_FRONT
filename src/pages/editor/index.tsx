import styled from "@emotion/styled";
import type { NextPage } from "next";
import { KeyboardEvent } from "react";
import { Tag } from "../../components/Common/Tag";
import { useState } from "react";
import { MDviewr } from "../../components/Editor/MDViewer";
import { BottomMenu } from "../../components/Editor/BottomMenu";
import { ToolBar } from "../../components/Editor/ToolBar";
import { MEDIA_QUERY_END_POINT } from "../../constants";

const Editor: NextPage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [guide, setGuide] = useState(false);
  const [listDatas, setListDatas] = useState([""]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    console.log(`title`, title);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    console.log(`contents`, contents);
  };

  const handleTagArea = () => {
    setGuide(true);
  };

  const hadleTagHide = () => {
    setGuide(false);
  };

  const addTagData = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(`e`, e.key);
    }
  };

  return (
    <EditorViewer>
      <EditorWrap>
        <h1 className="sr-only">Editor</h1>
        <EditorForm action="">
          <Header>
            <TitleArea
              onChange={handleTitleChange}
              value={title}
              name=""
              id=""
              placeholder="제목을 입력하세요"
            />
            <BorderLine />
            <Tag tagName={listDatas[0]} />
            {listDatas?.map((listData) => {})}
            <TagInput
              onFocus={handleTagArea}
              onBlur={hadleTagHide}
              onKeyDown={addTagData}
              type="text"
              placeholder="태그를 입력하세요"
              className="TagContents"
            />
            {guide && (
              <Guide>
                <p>쉼표 혹은 엔터를 입력하면 태그를 등록 할 수 있습니다.</p>
                <p>등록된 태그를 클릭하면 삭제됩니다.</p>
              </Guide>
            )}
            <ToolBar />
          </Header>
          <ContentsArea
            onChange={handleTextAreaChange}
            value={contents}
            placeholder="당신의 이야기를 적어보세요..."
            name=""
            id=""
          />
        </EditorForm>
        <BottomMenu />
      </EditorWrap>
      <MDWrap>
        <MDviewr title={title} contents={contents} />
      </MDWrap>
    </EditorViewer>
  );
};

const EditorViewer = styled.section`
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

const BorderLine = styled.div`
  width: 64px;
  height: 6px;
  margin: 24px 0 16px;
  background-color: rgb(73, 80, 87);
`;

const TagInput = styled.input`
  display: inline-flex;
  border: none;
  padding: 1px 2px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: text;

  ::placeholder {
    color: #6f7275;
  }

  :focus {
    outline: none;
  }
`;

const Guide = styled.div`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  width: 276px;
  height: 58px;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  background-color: #343a40;
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

const TitleArea = styled.textarea`
  resize: none;
  border: none;
  width: 100%;
  height: 66px;
  font-size: 44px;
  font-weight: 700;

  ::placeholder {
    color: #adb5bd;
  }

  :focus {
    outline: none;
  }
`;

const ContentsArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  resize: none;
  border: none;
  width: 100%;
  height: calc(100% - 331px);
  padding: 0 48px;
  font-size: 18px;
  line-height: 27px;

  :focus {
    outline: none;
  }
`;

const Header = styled.div`
  padding: 32px 48px 0;
  flex-shrink: 0;
  box-sizing: border-box;
`;

export default Editor;
