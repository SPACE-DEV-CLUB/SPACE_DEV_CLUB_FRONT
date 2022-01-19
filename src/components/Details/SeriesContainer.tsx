import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS_LIGHT } from "../../constants/index";
import Link from "next/link";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

interface ThemeProps {
  theme: Theme;
}

const seriesData = [
  {
    ID: 0,
    PATH: "#",
    TITLE: "시리즈1",
  },
  {
    ID: 1,
    PATH: "#",
    TITLE: "시리즈2",
  },
  {
    ID: 2,
    PATH: "#",
    TITLE: "시리즈3",
  },
];

export const SeriesContainer = () => {
  const { theme } = useContext(ThemeContext);
  const [select, setSelect] = useState(false);
  const handleSeries = () => {
    setSelect(!select);
  };
  return (
    <Container theme={theme}>
      <SeriesHeader>
        <Link href="#">
          <SeriesName theme={theme}>시리즈제목</SeriesName>
        </Link>
      </SeriesHeader>
      <BookmarkIcon className="BookmarkIcon" />
      {select && (
        <SeriesList>
          {seriesData.map((series) => {
            const { ID, PATH, TITLE } = series;
            return (
              <SeriesItem key={`series-id-${ID}`} theme={theme}>
                <Link href={PATH}>
                  <SeriesTitle theme={theme}>{TITLE}</SeriesTitle>
                </Link>
              </SeriesItem>
            );
          })}
        </SeriesList>
      )}
      <SPContainer>
        <SelectBox onClick={handleSeries}>
          {select ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <Select>{select ? "숨기기" : "목록 보기"}</Select>
        </SelectBox>
        <Pagination>
          <SeriesNumber>2/3</SeriesNumber>
          <BtnContainer>
            <Btn>
              <ArrowBackIosIcon className="series-arrow" />
            </Btn>
            <Btn>
              <ArrowForwardIosIcon className="series-arrow" />
            </Btn>
          </BtnContainer>
        </Pagination>
      </SPContainer>
    </Container>
  );
};

// 시리즈 제목과 svg 컨테이너
const Container = styled.article<ThemeProps>`
  margin-top: 32px;
  padding: 32px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};

  .BookmarkIcon {
    position: absolute;
    top: -10px;
    right: 30px;
    width: 60px;
    height: 60px;
    color: ${PALLETS_LIGHT.MAIN};
  }
`;
const SeriesHeader = styled.h3`
  padding-bottom: 32px;
  font-size: 24px;
`;
const SeriesName = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
`;
const SeriesItem = styled.li<ThemeProps>`
  &::before {
    counter-increment: item;
    content: counter(item) ". ";

    color: ${({ theme }) => theme.SUB_FONT};
    font-style: italic;
    margin-right: 5px;
  }
`;
const SeriesTitle = styled.a<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  line-height: 30px;
  /* 선택된 시리즈.. 생각해보기 */
  &.on {
    color: ${PALLETS_LIGHT.MAIN};
    font-weight: 700;
  }
  &:hover {
    text-decoration: underline;
  }
`;
const SPContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SelectBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
const Select = styled.span`
  margin-top: 5px;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: space-between;

  .series-arrow {
    width: 10px;
    height: 10px;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SeriesList = styled.ol`
  margin-bottom: 60px;
  counter-reset: item 0;
`;

const SeriesNumber = styled.span`
  margin-right: 20px;
  color: ${PALLETS_LIGHT.MAIN};
`;
const Btn = styled.button`
  /* 마지막 페이지면 넘어가기 호버 및 클릭 막기 */
  color: ${PALLETS_LIGHT.MAIN};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  border-radius: 50%;
  font-size: 20px;
  &:hover {
    background-color: ${PALLETS_LIGHT.MAIN};
    color: ${PALLETS_LIGHT.CARD_BACKGROUND};
  }
`;
