import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { TagGenerator } from "./TagGenerator";
import { PALLETS_LIGHT } from "../../constants/index";

interface WriteHeaderProps {
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnterEvent: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackSpace: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemove: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
  tagInput: string;
  listTagDatas: string[];
}

export const WriteHeader = ({
  handleTitleChange,
  handleEnterEvent,
  handleInputValue,
  handleBackSpace,
  onRemove,
  title,
  tagInput,
  listTagDatas,
}: WriteHeaderProps) => {
  const [guide, setGuide] = useState(false);

  const handleTagShow = () => {
    setGuide(true);
  };

  const hadleTagHide = () => {
    setGuide(false);
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
      {listTagDatas &&
        listTagDatas.map((listTagData, idx) => {
          return (
            <TagGenerator key={idx} tagName={listTagData} onRemove={onRemove} />
          );
        })}
      <TagInput
        onFocus={handleTagShow}
        onBlur={hadleTagHide}
        onKeyPress={handleEnterEvent}
        onChange={handleInputValue}
        onKeyDown={handleBackSpace}
        type="text"
        value={tagInput}
        placeholder="태그를 입력하세요"
      />
      <Guide move={guide}>
        <p>쉼표 혹은 엔터를 입력하면 태그를 등록 할 수 있습니다.</p>
        <p>등록된 태그를 클릭하면 삭제됩니다.</p>
      </Guide>
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

const Guide = styled.div<{ move: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 276px;
  height: 58px;
  padding-left: 8px;
  font-size: 12px;
  line-height: 1.5;
  color: ${PALLETS_LIGHT.CARD_BACKGROUND};
  background-color: ${PALLETS_LIGHT.MAIN_FONT};
  transition: opacity 0.5s;
  opacity: ${(props) => (props.move ? "1" : "0")};
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
