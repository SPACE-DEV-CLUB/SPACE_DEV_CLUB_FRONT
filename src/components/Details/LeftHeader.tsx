import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS } from "../../constants/index";
import Link from "next/link";

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
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            ></path>
          </svg>
        </div>
        <p className="heartCounter">{heartNum}</p>
        <div className="circleBtn" onClick={handleShare}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="share">
            <path
              fill="currentColor"
              d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"
            ></path>
          </svg>
        </div>
        <div
          className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem1"
          }`}
        >
          <Link href="#">
            <a>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
              </svg>
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
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
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
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M21.586 10.461l-10.05 10.075c-1.95 1.949-5.122 1.949-7.071 0s-1.95-5.122 0-7.072l10.628-10.585c1.17-1.17 3.073-1.17 4.243 0 1.169 1.17 1.17 3.072 0 4.242l-8.507 8.464c-.39.39-1.024.39-1.414 0s-.39-1.024 0-1.414l7.093-7.05-1.415-1.414-7.093 7.049c-1.172 1.172-1.171 3.073 0 4.244s3.071 1.171 4.242 0l8.507-8.464c.977-.977 1.464-2.256 1.464-3.536 0-2.769-2.246-4.999-5-4.999-1.28 0-2.559.488-3.536 1.465l-10.627 10.583c-1.366 1.368-2.05 3.159-2.05 4.951 0 3.863 3.13 7 7 7 1.792 0 3.583-.684 4.95-2.05l10.05-10.075-1.414-1.414z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </article>
    </Container>
  );
};

const Container = styled.section`
  flex: 1;
  display: flex;
  justify-content: end;

  article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: #f8f9fa;
    border-radius: 40px;
    width: 70px;
    height: 150px;
    margin: 220px 80px 0 0;
  }

  /* 스크롤 어느정도 내려올 경우 leftOn 클래스 add 해야함 -> 아직 미구현*/

  .circleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #adb5bd;
    border: 1px solid #adb5bd;
    background-color: none;
    border-radius: 50%;
    cursor: pointer;
  }
  a {
    color: #adb5bd;
  }
  .circleBtn:hover > a {
    color: #000;
  }
  .circleBtn:hover {
    color: #000;
    border: 1px solid #000;
  }

  .heartOn {
    color: #fff;
    border: none;
    background-color: ${PALLETS.MAIN};
  }
  .heartOn:hover {
    color: #fff;
    border: none;
    opacity: 0.8;
  }
  .heartOff {
    color: rgb(173, 181, 189);
    border: 1px solid rgb(173, 181, 189);
    background-color: none;
  }

  .heartCounter {
    color: #495057;
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
    transform: translateX(90px) translateY(40px);
  }
  .ShareItem3 {
    transform: translateX(60px) translateY(90px);
  }
`;
