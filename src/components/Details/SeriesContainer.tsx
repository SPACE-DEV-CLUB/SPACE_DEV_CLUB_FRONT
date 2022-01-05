import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS } from "../../constants/index";

export const SeriesContainer = () => {
  const [select, setSelect] = useState(false);
  const handleSeries = () => {
    setSelect(!select);
  };
  return (
    <Container>
      <h3>
        <a href="#">시리즈제목</a>
      </h3>
      <SeriesSVG
        width="32"
        height="48"
        fill="none"
        viewBox="0 0 32 48"
        className="series-corner-image"
      >
        <path
          fill={`${PALLETS.MAIN}`}
          d="M32 0H0v48h.163l16-16L32 47.836V0z"
        ></path>
      </SeriesSVG>
      {select && (
        <ol>
          <li className="aaaa">
            <a href="#">시리즈1</a>
          </li>
          <li className="aaaa">
            <a href="#" className="on">
              시리즈2
            </a>
          </li>
          <li className="aaaa">
            <a href="#">시리즈3</a>
          </li>
        </ol>
      )}
      <SPContainer>
        <SelectBox onClick={handleSeries}>
          {select ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14l5-5 5 5z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          )}
          <span>{select ? "숨기기" : "목록 보기"}</span>
        </SelectBox>
        <Pagination>
          <span>2/3</span>
          <div>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
              </svg>
            </button>
            <button>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
              </svg>
            </button>
          </div>
        </Pagination>
      </SPContainer>
    </Container>
  );
};

// 시리즈 제목과 svg 컨테이너
const Container = styled.article`
  margin-top: 32px;
  padding: 32px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  h3 {
    padding-bottom: 32px;
    font-size: 24px;
  }
  h3 > a:hover {
    color: #868296;
    text-decoration: underline;
  }
  div {
    display: flex;
    justify-content: space-between;
  }

  ol {
    margin-bottom: 60px;
    counter-reset: item 0;
  }
  ol > li > a {
    color: #495057;
    line-height: 30px;
  }
  /* 현재 상세 페이지가 해당 시리즈의 글일 경우 */
  ol > li > a.on {
    color: ${PALLETS.MAIN};
    font-weight: 700;
  }
  ol li::before {
    counter-increment: item;
    content: counter(item) ". ";

    color: rgb(173, 181, 189);
    font-style: italic;
    margin-right: 5px;
  }
  ol > li > a:hover {
    text-decoration: underline;
  }
`;
const SeriesSVG = styled.svg`
  position: absolute;
  top: 0;
  right: 30px;
`;
// 시리즈 목록 보기 select 박스 부분과 다음 이전 버튼 컨테이너
const SPContainer = styled.div``;
const SelectBox = styled.div`
  cursor: pointer;
`;
const Pagination = styled.div`
  /*  현재 글/시리즈 글 갯수 */
  span {
    margin-right: 20px;
    color: #adb5bd;
  }
  /* 마지막 페이지면 넘어가기 호버 및 클릭 막기 */
  button {
    color: ${PALLETS.MAIN};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(241, 243, 245);
    border-radius: 50%;
    font-size: 20px;
  }
  button:hover {
    background-color: ${PALLETS.MAIN};
    color: #fff;
  }
`;
