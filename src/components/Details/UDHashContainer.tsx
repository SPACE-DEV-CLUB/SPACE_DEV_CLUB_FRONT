import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../constants/index";
import Link from "next/link";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import { handleDate } from "../../utils/date";

interface ThemeProps {
  theme: Theme;
}

interface UserData {
  userName: string | string[] | undefined;
  createdAt: string;
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

const user = true;

export const UDHashContainer = ({ userName, createdAt }: UserData) => {
  const { theme } = useContext(ThemeContext);
  return (
    <article>
      <h2 className="sr-only">해시태그 및 글 수정, 삭제</h2>
      <UDContainer>
        <div>
          <Link href="#" passHref>
            <Nickname theme={theme}>{userName}</Nickname>
          </Link>
          <CreatedAt theme={theme}>{handleDate(createdAt)}</CreatedAt>
        </div>
        {user && (
          <div>
            <Link href="#" passHref>
              <UDItem theme={theme}>통계</UDItem>
            </Link>
            <Link href="#" passHref>
              <UDItem theme={theme}>수정</UDItem>
            </Link>
            <Link href="#" passHref>
              <UDItem theme={theme}>삭제</UDItem>
            </Link>
          </div>
        )}
      </UDContainer>
      <TagContainer>
        {tagDatas.map((tag) => {
          const { id, name } = tag;
          return (
            <TagItem theme={theme} key={`Tag-key-${id}`}>
              <Link href="#" passHref>
                <Tag theme={theme}>{name}</Tag>
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
    background-color: ${({ theme }) => theme.BACKGROUND};
  }
`;
const Tag = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.MAIN};
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
const CreatedAt = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  margin-left: 8px;
  &::before {
    content: "·";
    margin-right: 8px;
    color: ${({ theme }) => theme.SUB_FONT};
  }
`;
const UDItem = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.ICON};
  font-weight: 500;
  margin-right: 7px;
  &:hover {
    color: ${({ theme }) => theme.SUB_FONT};
  }
`;
