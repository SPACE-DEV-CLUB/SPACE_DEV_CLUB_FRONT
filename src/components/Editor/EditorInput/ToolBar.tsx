import styled from "@emotion/styled";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";
import { useContext } from "react";
import { ThemeContext } from "../../../pages/_app";
import { ThemeProps } from "../../../types/Theme";

interface ButtonProps {
  handleLineStyle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDecoBtn: any;
}

export const ToolBar = ({ handleDecoBtn, handleLineStyle }: ButtonProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Container>
      <h4 className="sr-only">ToolBar</h4>
      <BtnHead onClick={handleLineStyle} theme={theme} type="button">
        <div>
          H<span>1</span>
        </div>
      </BtnHead>
      <BtnHead onClick={handleLineStyle} theme={theme} type="button">
        <div>
          H<span>2</span>
        </div>
      </BtnHead>
      <BtnHead onClick={handleLineStyle} theme={theme} type="button">
        <div>
          H<span>3</span>
        </div>
      </BtnHead>
      <BtnHead onClick={handleLineStyle} theme={theme} type="button">
        <div>
          H<span>4</span>
        </div>
      </BtnHead>
      <BorderLine theme={theme} />
      <BtnIcon
        onClick={(e) => handleDecoBtn(e, "bold")}
        theme={theme}
        type="button"
      >
        <FormatBoldIcon />
      </BtnIcon>
      <BtnIcon
        onClick={(e) => handleDecoBtn(e, "italic")}
        theme={theme}
        type="button"
      >
        <FormatItalicIcon />
      </BtnIcon>
      <BtnIcon
        onClick={(e) => handleDecoBtn(e, "cross")}
        theme={theme}
        type="button"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1.7em"
          width="1.7em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path>
        </svg>
      </BtnIcon>
      <BorderLine theme={theme} />
      <BtnIcon onClick={handleLineStyle} theme={theme} type="button">
        <FormatQuoteIcon />
      </BtnIcon>
      <BtnIcon theme={theme} type="button">
        <LinkIcon />
      </BtnIcon>
      <BtnIcon theme={theme} type="button">
        <ImageIcon />
      </BtnIcon>
      <BtnIcon theme={theme} type="button">
        <CodeIcon />
      </BtnIcon>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 16px;
  padding: 0 48px;
`;

const BtnHead = styled.button<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.ICON};

  div {
    font-size: 16px;
    font-weight: bold;
    font-family: serif;
  }

  span {
    font-size: 12px;
  }

  &:hover {
    color: ${({ theme }) => theme.MAIN_FONT};
    background: ${({ theme }) => theme.SUBBACKGROUND};
  }
`;

const BtnIcon = styled.button<ThemeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.ICON};

  &:hover {
    color: ${({ theme }) => theme.MAIN_FONT};
    background: ${({ theme }) => theme.SUBBACKGROUND};
  }
`;

const BorderLine = styled.div<ThemeProps>`
  width: 1px;
  height: 20px;
  margin: 0 8px;
  background: ${({ theme }) => theme.SUBBACKGROUND};
`;
function e(e: any, arg1: string): void {
  throw new Error("Function not implemented.");
}
