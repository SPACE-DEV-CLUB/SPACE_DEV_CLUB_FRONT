import styled from "@emotion/styled"
import { MEDIA_QUERY_END_POINT } from "../../../constants"
import SearchIcon from "@mui/icons-material/Search"
import { MyCard } from "../MyCard"
import { useData } from "../../../hooks/useData"
import { Theme } from "../../../styles/theme"
import { useContext } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"

interface ContentProps {
  username: string | string[] | undefined
}

export const Content = ({ username }: ContentProps) => {
  const { data, error } = useData("cards")
  const { theme } = useContext(ThemeContext)
  return (
    <ContentContainer>
      <SearchContainer theme={theme}>
        <article className="searchBox">
          <SearchIcon />
          <input type="text" placeholder="검색어를 입력하세요." />
        </article>
      </SearchContainer>
      <SmallTaglist theme={theme}>
        <ul>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          {/* 태그 데이터 받아서 추가 */}
        </ul>
      </SmallTaglist>
      <LargeTaglist theme={theme}>
        <h1>태그 목록</h1>
        <ul>
          <li>
            <a>전체보기</a>
            <span>(50)</span>
          </li>
          {/* 태그 데이터 받아서 추가 */}
        </ul>
      </LargeTaglist>
      <section>
        {data?.data.map((e: any, index: number) => (
          <MyCard
            key={index}
            imageUrl={e.attributes.imageUrl}
            postTitle={e.attributes.postTitle}
            postDesc={e.attributes.postDesc}
            tags={e.attributes.tag.tags}
            date={e.attributes.date}
            comment={e.attributes.comment}
            username={username}
          />
        ))}
      </section>
    </ContentContainer>
  )
}

const ContentContainer = styled.section`
  position: relative;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0 16px;
  }
`

const SearchContainer = styled.article<ThemeProps>`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
  .searchBox {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.MAIN_FONT};
    cursor: text;
    input {
      margin-left: 8px;
      border: none;
      outline: none;
      font-size: 14px;
      background: ${({ theme }) => theme.BACKGROUND};
      color: ${({ theme }) => theme.MAIN_FONT};
    }
  }
`
const LargeTaglist = styled.section<ThemeProps>`
  display: block;
  position: absolute;
  top: 58px;
  left: -250px;
  width: 200px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    display: none;
  }
  h1 {
    width: 100%;
    line-height: 24px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.BACKGROUND};
  }
  li a {
    margin-right: 5px;
    color: ${({ theme }) => theme.MAIN_FONT};
    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.MAIN};
    }

    &:active {
      color: ${({ theme }) => theme.MAIN};
    }
  }
`

const SmallTaglist = styled.section<ThemeProps>`
  display: none;
  width: 100%;
  padding: 16px 0;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0;
    padding-bottom: 16px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    display: block;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
      padding: 0;
    }
    li {
      display: flex;
      justify-content: center;
      flex-shrink: 0;
      align-items: center;
      padding: 0 14px;
      height: 24px;
      line-height: 1.5;
      background: ${({ theme }) => theme.SUBBACKGROUND};
      color: ${({ theme }) => theme.SUB_FONT};
      font-size: 12px;
      border-radius: 12px;
      &:active,
      &:active * {
        font-size: 12px;
        background: ${({ theme }) => theme.MAIN};
        color: ${({ theme }) => theme.BACKGROUND};
      }
      a {
        line-height: 24px;
        color: ${({ theme }) => theme.MAIN_FONT};
      }
      span {
        color: ${({ theme }) => theme.SUB_FONT};
        margin-left: 5px;
      }
    }
    li + li {
      margin-left: 8px;
    }
  }
`
