import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../constants/index";
import Link from "next/link";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

interface ThemeProps {
  theme: Theme;
}

const tagDatas = [
  {
    id: 0,
    name: "태그입니다1",
  },
  {
    id: 1,
    name: "태그입니다2",
  },
];

export const UDHashContainer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <article>
      <h2 className="sr-only">해시태그 및 글 수정, 삭제</h2>
      <UDContainer>
        <Link href="#">
          <Nickname theme={theme}>velog닉네임</Nickname>
        </Link>
        <div>
          <Link href="#">
            <UDItem>통계</UDItem>
          </Link>
          <Link href="#">
            <UDItem>수정</UDItem>
          </Link>
          <Link href="#">
            <UDItem>삭제</UDItem>
          </Link>
        </div>
      </UDContainer>
      <TagContainer>
        {tagDatas.map((tag) => {
          const { id, name } = tag;
          return (
            <TagItem theme={theme} key={`Tag-key-${id}`}>
              <Link href="#">
                <Tag>{name}</Tag>
              </Link>
            </TagItem>
          );
        })}
      </TagContainer>
    </article>
  );
};

const TagContainer = styled.ul`
  display: flex;
  margin: 16px 0;
`;
const TagItem = styled.li<ThemeProps>`
  background-color: ${({ theme }) => theme.SUB};
  border-radius: 25px;
  padding: 5px 15px;
  &:not(:last-child) {
    margin-right: 15px;
  }
  &:hover {
    background-color: ${PALLETS_LIGHT.BACKGROUND};
  }
`;
const Tag = styled.a`
  color: ${PALLETS_LIGHT.MAIN};
`;
const UDContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Nickname = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
const UDItem = styled.a`
  color: ${PALLETS_LIGHT.ICON};
  font-weight: 500;
  &:not(:last-child) {
    margin-right: 8px;
  }
  &:hover {
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
`;
