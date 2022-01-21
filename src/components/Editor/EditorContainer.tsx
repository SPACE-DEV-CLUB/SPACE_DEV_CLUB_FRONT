import styled from "@emotion/styled";
import { useState } from "react";
import { WriteHeader } from "./WriteHeader";
import { WriteForm } from "./WriteForm";
import { BottomMenu } from "./BottomMenu";
import { MDviewr } from "./MDViewer";
import { MEDIA_QUERY_END_POINT } from "../../constants";

export const EditorContainer = () => {
  const [tagInput, setTagInput] = useState("");
  //state data for POST down below
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [listTagDatas, setListTagDatas] = useState<Array<string>>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  //control tag & tag guide
  const handleEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentTagetValue = e.currentTarget.value;

    if (e.key === "Enter") {
      e.preventDefault();
      setTagInput("");

      if (checkOverlap(currentTagetValue)) {
        setListTagDatas([...listTagDatas, e.currentTarget.value]);
      }
    }
  };

  const checkOverlap = (currentValue: string) => {
    if (tagInput.length > 0) {
      return !listTagDatas.includes(currentValue);
    } else {
      return false;
    }
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const onRemove = (e: React.MouseEvent<HTMLElement>) => {
    const eventTarget = e.target as HTMLElement;

    setListTagDatas(
      listTagDatas.filter(
        (listTagData) => listTagData !== eventTarget.innerText
      )
    );
  };

  const handleBackSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      listTagDatas.pop();
      setListTagDatas([...listTagDatas]);
    }
  };

  return (
    <>
      <EditorWrap>
        <EditorForm action="">
          <WriteHeader
            handleTitleChange={handleTitleChange}
            title={title}
            handleEnterEvent={handleEnterEvent}
            handleInputValue={handleInputValue}
            handleBackSpace={handleBackSpace}
            onRemove={onRemove}
            tagInput={tagInput}
            listTagDatas={listTagDatas}
          />
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
