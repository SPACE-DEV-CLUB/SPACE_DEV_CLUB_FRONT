import { useState } from "react";
import styled from "@emotion/styled";
import { Tag } from "../Common/Tag";
import { css } from "@emotion/react";
import { PALLETS_LIGHT } from "../../constants";

interface WriteHeaderProps {
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  title: string;
}

export const WriteHeader = ({ handleTitleChange, title }: WriteHeaderProps) => {
  const [guide, setGuide] = useState(false);
  const [listDatas, setListDatas] = useState([""]);

  const handleTagArea = () => {
    setGuide(true);
  };

  const hadleTagHide = () => {
    setGuide(false);
  };

  const addTagData = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(`e`, e.key);
    }
  };

  return (
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
    </Header>
  );
};

const Header = styled.div`
  padding: 32px 48px 0;
  flex-shrink: 0;
  box-sizing: border-box;
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
