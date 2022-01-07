import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS } from "../../constants/index";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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
      <BookmarkIcon className="BookmarkIcon" />
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
          {select ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <span>{select ? "숨기기" : "목록 보기"}</span>
        </SelectBox>
        <Pagination>
          <span>2/3</span>
          <div>
            <button>
              <ArrowBackIosIcon className="series-arrow" />
            </button>
            <button>
              <ArrowForwardIosIcon className="series-arrow" />
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
  .BookmarkIcon {
    position: absolute;
    top: -10px;
    right: 30px;
    width: 60px;
    height: 60px;
    color: ${PALLETS.MAIN};
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
// 시리즈 목록 보기 select 박스 부분과 다음 이전 버튼 컨테이너
const SPContainer = styled.div``;
const SelectBox = styled.div`
  cursor: pointer;
  span {
    margin-top: 5px;
  }
`;
const Pagination = styled.div`
  /*  현재 글/시리즈 글 갯수 */
  span {
    margin-right: 20px;
    color: #adb5bd;
  }
  .series-arrow {
    width: 10px;
    height: 10px;
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
