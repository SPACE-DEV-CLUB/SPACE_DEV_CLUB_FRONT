import styled from "@emotion/styled";
import { css } from "@emotion/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import CodeIcon from "@mui/icons-material/Code";

// interface ButtonProps {
//   bgColor: string;
//   ftColor: string;
//   fontWeight: number;
// }

export const ToolBar = () => {
  return (
    <ToolContainer>
      <BtnHead>
        <div>
          H<span>1</span>
        </div>
      </BtnHead>
      <BtnHead>
        <div>
          H<span>2</span>
        </div>
      </BtnHead>
      <BtnHead>
        <div>
          H<span>3</span>
        </div>
      </BtnHead>
      <BtnHead>
        <div>
          H<span>4</span>
        </div>
      </BtnHead>
      <BorderLine />

      <BtnIcon>
        <FormatBoldIcon />
      </BtnIcon>
      <BtnIcon>
        <FormatItalicIcon />
      </BtnIcon>
      <BtnIcon>
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
      <BorderLine />

      <BtnIcon>
        <FormatQuoteIcon />
      </BtnIcon>
      <BtnIcon>
        <LinkIcon />
      </BtnIcon>
      <BtnIcon>
        <ImageIcon />
      </BtnIcon>
      <BtnIcon>
        <CodeIcon />
      </BtnIcon>
    </ToolContainer>
  );
};

const ToolContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 16px;
`;

const BtnHead = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  color: rgb(134, 142, 150);

  div {
    font-size: 16px;
    font-weight: bold;
    font-family: serif;
  }

  span {
    font-size: 12px;
  }

  &:hover {
    color: rgb(33, 37, 41);
    background: rgb(248, 249, 250);
  }
`;

const BtnIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  color: rgb(134, 142, 150);

  &:hover {
    color: rgb(33, 37, 41);
    background: rgb(248, 249, 250);
  }
`;

const BorderLine = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 8px;
  background: rgb(206, 212, 218);
`;
