import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";

interface TagProps {
  tagName: string;
  onRemove: (e: React.MouseEvent<HTMLElement>) => void;
}

export const TagGenerator = ({ tagName, onRemove }: TagProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TagItem theme={theme} onClick={onRemove}>
      {tagName}
    </TagItem>
  );
};

const TagItem = styled.div<ThemeProps>`
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  margin: 0 12px 12px 0;
  border-radius: 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.SUB_FONT};
  background: ${({ theme }) => theme.SUBBACKGROUND};
  cursor: pointer;

  transition: all 0.125s ease-in 0s;
  animation: 0.125s ease-in-out 0s 1 normal forwards running iMKika;
`;
