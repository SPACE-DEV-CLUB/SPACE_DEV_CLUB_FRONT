import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS_LIGHT } from "../../constants/index";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export const LeftHeader = () => {
  const [heartNum, setHeartNum] = useState(0);
  const [heartClick, setHeartClick] = useState(false);
  const [shareClick, setShareClick] = useState(false);

  const handleHeart = () => {
    let num = heartNum;

    setHeartClick(!heartClick);
    !heartClick ? (num += 1) : (num -= 1);
    setHeartNum(num);
  };

  const handleShare = () => {
    setShareClick(!shareClick);
  };

  return (
    <Container>
      <h2 className="sr-only">좋아요 및 공유하기</h2>
      <article>
        <h3 className="sr-only">좋아요 버튼과 공유하기 버튼</h3>
        <div
          onClick={handleHeart}
          className={`circleBtn ${!heartClick ? "heartOff" : "heartOn"}`}
        >
          <FavoriteIcon />
        </div>
        <p className="heartCounter">{heartNum}</p>
        <div className="circleBtn" onClick={handleShare}>
          <ShareIcon />
        </div>
        <div
          className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem1"
          }`}
        >
          <Link href="#">
            <a>
              <FacebookIcon />
            </a>
          </Link>
        </div>
        <div
          className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem2"
          }`}
        >
          <Link href="#">
            <a>
              <TwitterIcon />
            </a>
          </Link>
        </div>
        <div
          className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem3"
          }`}
        >
          <Link href="#">
            <a>
              <AttachFileIcon />
            </a>
          </Link>
        </div>
      </article>
    </Container>
  );
};

const Container = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 210px;
  height: 100%;

  article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: ${PALLETS_LIGHT.BACKGROUND};
    border-radius: 40px;
    width: 70px;
    height: 150px;
  }

  /* 스크롤 어느정도 내려올 경우 leftOn 클래스 add 해야함 -> 아직 미구현*/

  .circleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${PALLETS_LIGHT.SUB_FONT};
    border: 1px solid ${PALLETS_LIGHT.SUB_FONT};
    background-color: none;
    border-radius: 50%;
    cursor: pointer;
  }
  a {
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
  .circleBtn:hover > a {
    color: ${PALLETS_LIGHT.MAIN_FONT};
  }
  .circleBtn:hover {
    color: ${PALLETS_LIGHT.MAIN_FONT};
    border: 1px solid ${PALLETS_LIGHT.MAIN_FONT};
  }

  .heartOn {
    color: ${PALLETS_LIGHT.BACKGROUND};
    border: none;
    background-color: ${PALLETS_LIGHT.MAIN};
  }
  .heartOn:hover {
    color: ${PALLETS_LIGHT.BACKGROUND};
    border: none;
    opacity: 0.8;
  }
  .heartOff {
    color: ${PALLETS_LIGHT.SUB_FONT};
    border: 1px solid ${PALLETS_LIGHT.SUB_FONT};
    background-color: none;
  }

  .heartCounter {
    color: ${PALLETS_LIGHT.SUB_FONT};
    font-size: 12px;
    font-weight: 700;
  }

  .ShareOff {
    position: absolute;
    transform: translateX(0px) translateY(40px);
    transition: all 0.5s ease-in-out;
    display: flex;
    z-index: -1;
  }
  .ShareItem {
    position: absolute;
    transition: all 0.5s ease-in-out;
  }
  .ShareItem1 {
    transform: translateX(60px) translateY(-10px);
  }
  .ShareItem2 {
    transform: translateX(85px) translateY(40px);
  }
  .ShareItem3 {
    transform: translateX(60px) translateY(90px);
  }
`;
