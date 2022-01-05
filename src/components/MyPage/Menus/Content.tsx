import styled from "@emotion/styled";
import { PALLETS } from "../../../constants";

export const Content = () => {
  return (
    <ContentContainer>
      <SearchContainer>
        <article className="searchBox">
          <span>Q</span>
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
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
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
      <section>cards</section>
    </ContentContainer>
  );
};

const ContentContainer = styled.section`
  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

const SearchContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    display: none;
  }
  .searchBox {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 2px solid #f2f2f2;
    cursor: text;
    input {
      margin-left: 8px;
      border: none;
      outline: none;
      font-size: 14px;
    }
  }
`;
const LargeTaglist = styled.section`
  display: block;
  position: relative;
  top: 58px;
  left: -250px;
  width: 200px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
  h1 {
    width: 100%;
    line-height: 24px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid #f2f2f2;
  }
  li a {
    margin-right: 5px;
    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${PALLETS.MAIN};
    }
  }
`;

const SmallTaglist = styled.section`
  display: none;
  width: 100%;
  padding: 16px 0;
  @media screen and (max-width: 1200px) {
    display: block;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    @media screen and (max-width: 768px) {
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
      color: rgb(52, 58, 64);
      font-size: 12px;
      border-radius: 12px;
      &:active,
      &:active * {
        font-size: 12px;
        background: ${PALLETS.MAIN};
        color: white;
      }
      a {
        line-height: 24px;
      }
      span {
        color: #9f9f9f;
        margin-left: 5px;
      }
    }
    li + li {
      margin-left: 8px;
    }
  }
`;
