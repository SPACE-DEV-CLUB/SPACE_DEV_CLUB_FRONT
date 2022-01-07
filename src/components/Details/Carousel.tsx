import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PALLETS } from "../../constants/index";

type IndexTypeProps = {
  index: number;
};

export const Carousel = () => {
  const src = [
    "https://cdn.pixabay.com/photo/2021/12/12/18/04/mountains-6865752_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/12/21/14/47/castle-6885449_960_720.jpg",
  ];
  const href = ["#", "#", "#"];
  const title = ["시리즈1", "시리즈2", "시리즈3"];
  const [caroucelIndex, setCaroucelIndex] = useState(0);

  const handlePrevBtn = () => {
    if (caroucelIndex === 0) return;
    setCaroucelIndex(caroucelIndex - 1);
  };
  const handleNextBtn = () => {
    if (caroucelIndex === src.length - 1) return;
    setCaroucelIndex(caroucelIndex + 1);
  };
  console.log(caroucelIndex);

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
          {src.map((s, i) => {
            return (
              <Link href={href[i]} key={`carousel-${s}`}>
                <a>
                  <p>{title[i]}</p>
                  <Img src={s} alt="" />
                </a>
              </Link>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
      <NextContainer>
        {caroucelIndex === src.length - 1 ? (
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
  justify-content: space-between;
`;
const CarouselContainer = styled.article`
  flex: 2;
  width: 400px;
  height: 250px;
  overflow: hidden;
`;
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translate3d(-${500 * props.index}px, 0, 0);
`;
const CarouselItem = styled.div`
  display: flex;
  ${caroucelIndex}
  transition: all 1s ease-in-out;
`;
const Img = styled.img`
  width: 500px;
  height: 500px;
`;
const PrevContainer = styled.div`
  flex: 1;
`;
const NextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;
const Btn = styled.button`
  width: 50px;
  height: 50px;
  color: ${PALLETS.MAIN};
  font-size: 32px;
  border: 1px solid rgb(173, 181, 189);
  border-radius: 50%;
  :hover {
    background-color: ${PALLETS.MAIN};
    color: #fff;
    border: 1px solid ${PALLETS.MAIN};
  }
`;
