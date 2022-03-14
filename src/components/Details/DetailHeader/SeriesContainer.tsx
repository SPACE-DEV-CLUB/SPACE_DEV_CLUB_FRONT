import styled from "@emotion/styled";
import { useState, useContext } from "react";
import { PALLETS_LIGHT } from "@constants/index";
import Link from "next/link";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import { useRouter } from "next/router";
import { SeriesBox, SeriesBoxPost } from "@src/types/Detail";

interface ThemeProps {
  theme: Theme;
}

interface CurrentPost {
  currentPost: number | undefined;
  SeriesBoxPostLength: number;
}

interface Current {
  theme: Theme;
  currentPost: boolean;
}

interface Props {
  seriesBox: SeriesBox;
  userName: string | string[] | undefined;
  SeriesBoxPost: SeriesBoxPost[];
  currentPost: number | undefined;
}

export const SeriesContainer = ({
  seriesBox,
  SeriesBoxPost,
  userName,
  currentPost,
}: Props) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const [select, setSelect] = useState(false);

  const handleSeries = () => {
    setSelect(!select);
  };

  const onClickBtn = (type: string) => {
    if (type === "prev" && currentPost !== 1) {
      const link = SeriesBoxPost[currentPost! - 2].attributes.url;
      router.push(`/${userName}/${link}`);
    }
    if (type === "next" && currentPost !== SeriesBoxPost.length) {
      const link = SeriesBoxPost[currentPost!].attributes.url;
      router.push(`/${userName}/${link}`);
    }
  };

  return (
    <Container theme={theme}>
      <SeriesHeader>
        <Link href={`/${userName}/series/${seriesBox.title}`} passHref>
          <SeriesName theme={theme}>{seriesBox.title}</SeriesName>
        </Link>
      </SeriesHeader>
      <BookmarkIcon className="BookmarkIcon" />
      {select && (
        <SeriesList>
          {SeriesBoxPost.map((data, i) => {
            const { title, url } = data.attributes;

            return (
              <SeriesItem key={`series-id-${data.id}`} theme={theme}>
                <Link href={`/${userName}/${url}`} passHref>
                  <SeriesTitle
                    theme={theme}
                    currentPost={currentPost === i + 1}
                  >
                    {title}
                  </SeriesTitle>
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
          {
            <SeriesNumber>
              {currentPost}/{SeriesBoxPost.length}
            </SeriesNumber>
          }
          <BtnContainer>
            <PrevBtn
              onClick={(e) => onClickBtn("prev")}
              currentPost={currentPost}
              SeriesBoxPostLength={SeriesBoxPost.length}
            >
              <ArrowBackIosIcon className="series-arrow" />
            </PrevBtn>
            <NextBtn
              onClick={(e) => onClickBtn("next")}
              currentPost={currentPost}
              SeriesBoxPostLength={SeriesBoxPost.length}
            >
              <ArrowForwardIosIcon className="series-arrow" />
            </NextBtn>
          </BtnContainer>
        </Pagination>
      </SPContainer>
    </Container>
  );
};

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
const SeriesTitle = styled.a<Current>`
  color: ${({ theme }) => theme.SUB_FONT};
  line-height: 30px;
  ${({ currentPost }) =>
    currentPost
      ? `    color: ${PALLETS_LIGHT.MAIN};
    font-weight: 700;`
      : ""}

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
const PrevBtn = styled.div<CurrentPost>`
  margin-right: 5px;
  color: ${PALLETS_LIGHT.MAIN};
  cursor: ${({ currentPost }) => (currentPost !== 1 ? "pointer" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  border-radius: 50%;
  font-size: 20px;
  opacity: ${({ currentPost }) => (currentPost !== 1 ? 1 : 0.3)};
  cursor: ${({ currentPost }) =>
    currentPost !== 1
      ? `  &:hover {
    background-color: ${PALLETS_LIGHT.MAIN};
    color: ${PALLETS_LIGHT.CARD_BACKGROUND};
  }`
      : ""};
`;
const NextBtn = styled.div<CurrentPost>`
  color: ${PALLETS_LIGHT.MAIN};
  cursor: ${({ currentPost, SeriesBoxPostLength }) =>
    currentPost !== SeriesBoxPostLength ? "pointer" : "auto"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  border-radius: 50%;
  font-size: 20px;
  opacity: ${({ currentPost, SeriesBoxPostLength }) =>
    currentPost !== SeriesBoxPostLength ? 1 : 0.3};
  ${({ currentPost, SeriesBoxPostLength }) =>
    currentPost !== SeriesBoxPostLength
      ? `  &:hover {
    background-color: ${PALLETS_LIGHT.MAIN};
    color: ${PALLETS_LIGHT.CARD_BACKGROUND};
  }`
      : ""};
`;
