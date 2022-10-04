import { throttle } from "lodash";
import styled from "@emotion/styled";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Theme } from "@src/styles/theme";
import { ThemeContext } from "@src/pages/_app";

interface Props {
  strNum: number;
  title: string;
  titleId: string;
  handleHeaderScroll: (titleId: string) => void;
  isRead: (titleId: string, scrollY: number) => boolean;
}

interface StrNumTheme {
  theme: Theme;
  strNum: number;
  isTrue: boolean;
}

export const NavigationItem = ({
  strNum,
  title,
  titleId,
  handleHeaderScroll,
  isRead,
}: Props) => {
  const beforeScrollY = useRef(0);
  const [isReadHeader, setIsReadHeader] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleHideHeader = useMemo(
    () =>
      throttle(() => {
        beforeScrollY.current = window.pageYOffset;
        setIsReadHeader(isRead(titleId, beforeScrollY.current));
      }, 250),
    [beforeScrollY]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleHideHeader);
    return () => {
      window.removeEventListener("scroll", handleHideHeader);
    };
  }, []);

  return (
    <Item
      theme={theme}
      strNum={strNum}
      isTrue={isReadHeader}
      onClick={() => handleHeaderScroll(titleId)}
    >
      {title}
    </Item>
  );
};

const Item = styled.div<StrNumTheme>`
  font-size: 14px;
  margin-bottom: 10px;
  margin-left: ${({ strNum }) => strNum * 10}px;
  color: ${({ isTrue, theme }) => (isTrue ? theme.MAIN : theme.POINT_FONT)};
  font-weight: ${({ isTrue }) => (isTrue ? 700 : 400)};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.BUTTON_SUB};
    font-weight: 700;
  }
`;
