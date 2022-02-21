import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PALLETS_LIGHT } from "@constants/index";
import { SeriesBoxPost } from "@src/types/Detail";

type IndexTypeProps = {
  index: number;
};

interface Props {
  userName: string | string[] | undefined;
  SeriesBoxPost: SeriesBoxPost[];
}

export const Carousel = ({ SeriesBoxPost, userName }: Props) => {
  const [caroucelIndex, setCaroucelIndex] = useState(0);

  const handlePrevBtn = () => {
    if (caroucelIndex === 0) return;
    setCaroucelIndex(caroucelIndex - 1);
  };
  const handleNextBtn = () => {
    if (caroucelIndex === SeriesBoxPost.length - 1) return;
    setCaroucelIndex(caroucelIndex + 1);
  };

  return (
    <Container>
      <PrevContainer>
        {caroucelIndex === 0 ? (
          <div></div>
        ) : (
          <Btn type="button" onClick={handlePrevBtn}>
            <ArrowBackIcon />
          </Btn>
        )}
      </PrevContainer>
      <CarouselContainer>
        <CarouselItem index={caroucelIndex}>
          {SeriesBoxPost.map((post, i) => {
            return (
              <Link
                href={`/${userName}/${post.attributes.url}`}
                key={`carousel-post-${i}`}
                passHref
              >
                <CarouselLink>
                  <CarouselTitle>{post.attributes.title}</CarouselTitle>
                </CarouselLink>
              </Link>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
      <NextContainer>
        {caroucelIndex === SeriesBoxPost.length - 1 ? (
          <div></div>
        ) : (
          <Btn type="button" onClick={handleNextBtn}>
            <ArrowForwardIcon />
          </Btn>
        )}
      </NextContainer>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 60px 0;
`;
const CarouselContainer = styled.article`
  width: 370px;
  height: 50px;
  overflow: hidden;
`;
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translate3d(-${370 * props.index}px, 0, 0);
`;
const CarouselItem = styled.div`
  display: flex;
  ${caroucelIndex}
  transition: all .5s ease-in-out;
`;
const PrevContainer = styled.div``;
const NextContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Btn = styled.button`
  width: 40px;
  height: 40px;
  color: ${PALLETS_LIGHT.MAIN};
  font-size: 32px;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  border-radius: 50%;
  :hover {
    background-color: ${PALLETS_LIGHT.MAIN};
    color: #fff;
    border: 1px solid ${PALLETS_LIGHT.MAIN};
  }
`;
const CarouselLink = styled.a`
  width: 370px;
  height: 50px;
  background-color: ${PALLETS_LIGHT.SUB};
  border-radius: 15px;
`;
const CarouselTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  width: 370px;
  height: 50px;
  color: ${PALLETS_LIGHT.MAIN};
`;
