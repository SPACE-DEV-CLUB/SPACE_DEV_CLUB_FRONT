import styled from "@emotion/styled"
import {
  MEDIA_QUERY_END_POINT,
  PALLETS_LIGHT,
  CARD_DATA,
} from "../../../constants"
import SearchIcon from "@mui/icons-material/Search"
import { MyCard } from "../MyCard"

export const Content = () => {
  return (
    <ContentContainer>
      <SearchContainer>
        <article className="searchBox">
          <SearchIcon />
          <input type="text" placeholder="검색어를 입력하세요." />
        </article>
      </SearchContainer>
      <SmallTaglist>
        <ul>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          {/* 태그 데이터 받아서 추가 */}
        </ul>
      </SmallTaglist>
      <LargeTaglist>
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
        {CARD_DATA.map((e, index) => (
          <MyCard
            key={index}
            imageUrl="/image/sample.jpeg"
            postTitle={e.postTitle}
            postDesc={e.postDesc}
            tags={e.tags}
            date={e.date}
            comment={e.comment}
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

const SearchContainer = styled.article`
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
    border: 2px solid ${PALLETS_LIGHT.BACKGROUND};
    cursor: text;
    input {
      margin-left: 8px;
      border: none;
      outline: none;
      font-size: 14px;
    }
  }
`
const LargeTaglist = styled.section`
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
    border-bottom: 1px solid ${PALLETS_LIGHT.BACKGROUND};
  }
  li a {
    margin-right: 5px;
    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${PALLETS_LIGHT.MAIN};
    }
  }
`

const SmallTaglist = styled.section`
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
      background: rgb(241, 243, 245);
      color: ${PALLETS_LIGHT.SUB_FONT};
      font-size: 12px;
      border-radius: 12px;
      &:active,
      &:active * {
        font-size: 12px;
        background: ${PALLETS_LIGHT.MAIN};
        color: white;
      }
      a {
        line-height: 24px;
      }
      span {
        color: ${PALLETS_LIGHT.SUB_FONT};
        margin-left: 5px;
      }
    }
    li + li {
      margin-left: 8px;
    }
  }
`
