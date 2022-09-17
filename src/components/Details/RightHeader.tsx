import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@src/pages/[id]/[detail]";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";

interface StrNumTheme {
  strNum: number;
  theme: Theme;
  isTrue: boolean;
}

interface ThemeProps {
  theme: Theme;
}

export const RightHeader = () => {
  const { postObj } = useContext(PostContext);
  const { theme } = useContext(ThemeContext);
  const [listData, setListData] = useState(postObj.contents.match(/#+ .*/g)!);
  const [scrollY, setScrollY] = useState<number>(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return (
    <Container theme={theme}>
      <h2 className="sr-only">목차</h2>
      {listData && (
        <article>
          {listData.map((str, i) => {
            const strNum = str.match(/#*/)?.join("").length!;
            const originHeader = str
              .match(/[^#+][#]*/g)
              ?.join("")
              .trim();
            const headerId = originHeader
              ?.match(/[^#]/g)
              ?.join("")
              .replace(/\s/g, "-");
            const target = document?.getElementById(`${headerId}`)!;
            const targetTop = target?.getBoundingClientRect().top;
            const headerTop = window.pageYOffset + targetTop!;
            const isTrue = scrollY + 1 >= headerTop;

            return (
              <a key={`Detail-List-${i}`} href={`#${headerId}`}>
                <List strNum={strNum} theme={theme} isTrue={isTrue}>
                  {originHeader}
                </List>
              </a>
            );
          })}
        </article>
      )}
    </Container>
  );
};

const Container = styled.section<ThemeProps>`
  position: -webkit-sticky;
  position: sticky;
  top: 290px;
  height: 100%;

  article {
    padding: 8px 10px;
    border-left: 2px solid ${({ theme }) => theme.BUTTON_SUB};
    margin-left: 40px;
  }
  div.h4 {
    margin-left: 12px;
  }
  @media screen and (max-width: 1365px) {
    display: none;
  }
`;
const List = styled.div<StrNumTheme>`
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: ${({ strNum }) => strNum * 10}px;
  color: ${({ isTrue, theme }) => (isTrue ? theme.MAIN : theme.POINT_FONT)};
  font-weight: ${({ isTrue }) => (isTrue ? 700 : 400)};
  &:hover {
    color: ${({ theme }) => theme.BUTTON_SUB};
    font-weight: 700;
  }
`;
