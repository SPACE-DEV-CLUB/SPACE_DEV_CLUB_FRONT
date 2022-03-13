import { useContext, useState } from "react";
import styled from "@emotion/styled";
import { CopyToClipboard } from "react-copy-to-clipboard";

import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { PALLETS_LIGHT } from "@src/constants";
import { PostContext } from "@src/pages/[id]/[details]";

export const Share = () => {
  const { postObj } = useContext(PostContext);
  const [shareClick, setShareClick] = useState(false);

  const handleShare = () => {
    setShareClick(!shareClick);
  };

  const copyUrl = () => {
    alert("링크가 복사되었습니다.");
    setShareClick(false);
  };

  const onClickFacebook = () => {
    const shareUrl = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}/`);
  };

  const onClickKakao = () => {
    const { Kakao, location } = window;

    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: postObj.title,
        description: postObj.contents.substring(0, 8),
        imageUrl:
          "https://cdn.pixabay.com/photo/2017/01/04/12/01/space-1951858_960_720.png",
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      // social: {
      //   likeCount: 10,
      //   commentCount: 5,
      //   sharedCount: 2,
      // },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
  };

  return (
    <Container>
      <h3 className="sr-only">공유하기</h3>
      <div className="circleBtn" onClick={handleShare}>
        <ShareIcon />
      </div>
      <div
        onClick={onClickFacebook}
        className={`circleBtn ShareItem ${
          !shareClick ? "ShareOff" : "ShareItem1"
        }`}
      >
        <FacebookIcon />
      </div>
      <div
        onClick={onClickKakao}
        className={`circleBtn ShareItem ${
          !shareClick ? "ShareOff" : "ShareItem2"
        }`}
      >
        <img src="/image/kakao.png" />
      </div>
      <div
        onClick={copyUrl}
        className={`circleBtn ShareItem ${
          !shareClick ? "ShareOff" : "ShareItem3"
        }`}
      >
        {/* <CopyToClipboard text={window.location.href}>
          <AttachFileIcon />
        </CopyToClipboard> */}
      </div>
    </Container>
  );
};

export const Container = styled.article`
  .circleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${PALLETS_LIGHT.ICON};
    border: 1px solid ${PALLETS_LIGHT.ICON};
    background-color: none;
    border-radius: 50%;
    cursor: pointer;
  }
  img {
    width: 20px;
    height: 20px;
    filter: opacity(0.5) ${`drop-shadow(0 0 0 ${PALLETS_LIGHT.ICON})`};
  }
  .circleBtn:hover {
    color: ${PALLETS_LIGHT.MAIN};
    border: 1px solid ${PALLETS_LIGHT.MAIN};
  }

  .ShareOff {
    position: absolute;
    transform: translateX(0px) translateY(-50px);
    transition: all 0.5s ease-in-out;
    display: flex;
    z-index: -1;
  }
  .ShareItem {
    position: absolute;
    transition: all 0.5s ease-in-out;
  }
  .ShareItem1 {
    transform: translateX(70px) translateY(-100px);
  }
  .ShareItem2 {
    transform: translateX(95px) translateY(-50px);
  }
  .ShareItem3 {
    transform: translateX(70px) translateY(0px);
  }

  @media screen and (max-width: 1025px) {
    display: none;
  }
`;
