import styled from "@emotion/styled";
import { css } from "@emotion/react";

type ButtonProps = {
  children?: JSX.Element | JSX.Element[] | string;
  bgColor: string;
  ftColor: string;
  fontWeight: number;
  type: "button" | "submit" | "reset" | undefined;
  handleBtn?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  children,
  bgColor,
  ftColor,
  fontWeight,
  type,
  handleBtn,
}: ButtonProps) => {
  return (
    <EditorButton
      fontWeight={fontWeight}
      ftColor={ftColor}
      bgColor={bgColor}
      type={type}
      onClick={handleBtn}
    >
      {children}
    </EditorButton>
  );
};

const dynamicStyle = (props: ButtonProps) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 18px;
  font-weight: ${props.fontWeight};
  line-height: 1.8;
  color: ${props.ftColor};
  background-color: ${props.bgColor};
  cursor: pointer;

  &:hover {
    filter: brightness(95%);
  }
`;

const EditorButton = styled.button`
  ${dynamicStyle}

  &:last-child {
    margin-left: 12px;
  }
`;
