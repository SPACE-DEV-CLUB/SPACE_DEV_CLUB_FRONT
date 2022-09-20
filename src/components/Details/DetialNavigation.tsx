import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";

import { PostStore } from "./Context";

interface StrNumTheme {
  theme: Theme;
  strNum: number;
  isTrue: boolean;
}

interface ThemeProps {
  theme: Theme;
}

const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

export const DetialNavigation = () => {
  const { postObj } = useContext(PostStore);
  const { theme } = useContext(ThemeContext);
  const [listData, _] = useState(postObj.contents.match(/#+ .*/g)!);
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

  const handleHeaderScroll = (titleId: string) => {
    document.getElementById(`${titleId}`)?.scrollIntoView();
  };

  return (
    <Container theme={theme}>
      <h2 className="sr-only">목차</h2>
      {listData && (
        <article>
          {listData.map((item) => {
            const strNum = item.match(/#*/)?.join("").length!;
            const str = item.split(/#* /).slice(1);
            const title = str.join(" ");
            const deleteSign = reg.test(title) ? title.replace(reg, "") : title;
            const titleId = deleteSign.toLowerCase().split(" ").join("-");

            const target = document?.getElementById(`${titleId}`)!;
            const targetTop = target?.getBoundingClientRect().top;
            const headerTop = window.pageYOffset + targetTop!;
            const isTrue = scrollY + 1 >= headerTop;

            return (
              <List
                key={`RightHeader-listData-${title}`}
                theme={theme}
                strNum={strNum}
                isTrue={isTrue}
                onClick={() => handleHeaderScroll(titleId)}
              >
                {title}
              </List>
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
