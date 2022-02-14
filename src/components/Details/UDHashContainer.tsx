import styled from "@emotion/styled";
import Link from "next/link";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import { handleDate } from "../../utils/date";

import { Tag } from "../Common/Tag";
import { Hashtags } from "../../pages/[id]/[details]";

interface ThemeProps {
  theme: Theme;
}

interface UserData {
  userName: string | string[] | undefined;
  createdAt: string;
  hashtags: Hashtags[];
}

const user = true;

export const UDHashContainer = ({
  userName,
  createdAt,
  hashtags,
}: UserData) => {
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
      {hashtags.map((tag) => {
        return (
          <Tag key={`Detail_tag_${tag.id}`} tagName={tag.attributes.name}></Tag>
        );
      })}
    </article>
  );
};

const UDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
