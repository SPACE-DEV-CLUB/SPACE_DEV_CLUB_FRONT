import styled from "@emotion/styled";
import { useState, useContext } from "react";
import { TagGenerator } from "./TagGenerator";
import { ThemeContext } from "../../../pages/_app";
import { ThemeProps } from "../../../types/Theme";

interface WriteHeaderProps {
  handleTitleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleTagEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBackSpace: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRemove: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
  tagInput: string;
  listTagDatas: string[];
}

export const WriteHeader = ({
  handleTitleChange,
  handleTagEnter,
  handleInputValue,
  handleBackSpace,
  onRemove,
  title,
  tagInput,
  listTagDatas,
}: WriteHeaderProps) => {
  const [guide, setGuide] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleTagShow = () => {
    setGuide(true);
  };

  const hadleTagHide = () => {
    setGuide(false);
  };

  return (
    <Header>
      <label htmlFor="editorTitle" className="sr-only">
        에디터 타이틀 입력란
      </label>
      <TitleArea
        onChange={handleTitleChange}
        value={title}
        name="editorTitle"
        id="editorTitle"
        placeholder="제목을 입력하세요"
        theme={theme}
      />
      <BorderLine theme={theme} />
      {listTagDatas &&
        listTagDatas.map((listTagData, idx) => {
          return (
            <TagGenerator key={idx} tagName={listTagData} onRemove={onRemove} />
          );
        })}
      <TagInput
        onFocus={handleTagShow}
        onBlur={hadleTagHide}
        onKeyPress={handleTagEnter}
        onChange={handleInputValue}
        onKeyDown={handleBackSpace}
        type="text"
        value={tagInput}
        placeholder="태그를 입력하세요"
        theme={theme}
      />
      <Guide move={guide} theme={theme}>
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

const TitleArea = styled.textarea<ThemeProps>`
  resize: none;
  border: none;
  width: 100%;
  height: 66px;
  font-size: 44px;
  font-weight: 700;
  color: ${({ theme }) => theme.MAIN_FONT};
  background: ${({ theme }) => theme.BACKGROUND};

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

  background-color: #cfcaf8;
  transition: opacity 0.5s;
  z-index: ${(props) => (props.move ? "10" : "-10")};
  opacity: ${(props) => (props.move ? "1" : "0")};
`;

// const Guide = styled.div<ThemeProps>`
//   color: ${({ theme }) => theme.MAIN_FONT};
//   background-color: ${({ theme }) => theme.MAIN_FONT};
// `;

const BorderLine = styled.div<ThemeProps>`
  width: 64px;
  height: 6px;
  margin: 24px 0 16px;
  background: ${({ theme }) => theme.SUB_FONT};
`;

const TagInput = styled.input<ThemeProps>`
  display: inline-flex;
  border: none;
  padding: 1px 2px;
  margin-bottom: 12px;
  font-size: 18px;
  cursor: text;
  color: ${({ theme }) => theme.MAIN_FONT};
  background: ${({ theme }) => theme.BACKGROUND};

  ::placeholder {
    color: #6f7275;
  }

  :focus {
    outline: none;
  }
`;
