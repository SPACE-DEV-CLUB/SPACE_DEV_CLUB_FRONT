import styled from "@emotion/styled";
import { useContext, useState } from "react";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";

import { PostStore } from "../Context";
import { NavigationItem } from "./NavigationItem";

interface ThemeProps {
  theme: Theme;
}

const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

export const DetialNavigation = () => {
  const { postObj } = useContext(PostStore);
  const { theme } = useContext(ThemeContext);
  const [listData, _] = useState(postObj.contents.match(/#+ .*/g)!);

  const handleHeaderScroll = (titleId: string) => {
    const header = document.getElementById(`${titleId}`);
    header?.scrollIntoView();
  };

  const isRead = (titleId: string, scrollY: number) => {
    const target = document?.getElementById(`${titleId}`)!;
    const targetTop = target?.getBoundingClientRect().top;
    const headerTop = window.pageYOffset + targetTop!;
    const isTrue = scrollY + 1 >= headerTop;
    return isTrue;
  };

  return (
    <Container theme={theme}>
      <h2 className="sr-only">목차</h2>
      {listData && (
        <article>
          {listData.map((item) => {
            const strNum = item.match(/#*/)?.join("").length!;
            const title = item.split(/#* /).slice(1).join(" ");
            const deleteSign = reg.test(title) ? title.replace(reg, "") : title;
            const titleId = deleteSign.toLowerCase().split(" ").join("-");

            return (
              <NavigationItem
                key={`RightHeader-listData-${title}`}
                strNum={strNum}
                title={title}
                titleId={titleId}
                handleHeaderScroll={handleHeaderScroll}
                isRead={isRead}
              />
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
