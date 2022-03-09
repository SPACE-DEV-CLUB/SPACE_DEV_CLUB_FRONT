import styled from "@emotion/styled";
import { useEffect, useState, useContext } from "react";
import { API_ENDPOINT, PALLETS_LIGHT } from "@constants/index";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import axios, { Method } from "axios";

import { PostContext } from "@src/pages/[id]/[details]";
import { Share } from "./Share";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  loginUserId: number | undefined;
  loginUserName: string | string[] | undefined;
}

interface ILikePost {
  id: number;
  attributes: {
    postid: {
      data: {
        id: number;
      };
    };
  };
}

export const LeftHeader = ({ loginUserId, loginUserName }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postid } = useContext(PostContext);
  const [heartNum, setHeartNum] = useState(0);
  const [heartClick, setHeartClick] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [putId, setPutId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loginUserId && getLikeData() && getLoggedUserLikeData();
  }, [postid]);

  const handleHeart = () => {
    if (!loginUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (loading) {
      alert("로딩중입니다. 잠시만 기다려주세요.");
      return;
    }
    let num = heartNum;

    setHeartClick(!heartClick);
    !heartClick ? (num += 1) : (num -= 1);
    !heartClick ? postLike() : postUnLike();
    setHeartNum(num);
  };
  const handleShare = () => {
    setShareClick(!shareClick);
  };
  const getLikeData = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*&filters[postid][id]=${postid}`,
    });
    setHeartNum(response.data.data.length);
  };

  const getLoggedUserLikeData = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*&filters[userid][userid]=${loginUserName}`,
    });
    const handleOverlap = response.data.data.some((post: ILikePost) => {
      if (post.attributes.postid.data !== null) {
        if (post.attributes.postid.data.id === postid) {
          setPutId(post.id);
          return true;
        }
      }
    });
    handleOverlap && setHeartClick(true);
  };

  const postLike = async () => {
    setLoading(true);
    axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/likeposts`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
        },
      },
    }).then(function (response) {
      setPutId(response.data.data.id);
      setLoading(false);
    });
  };

  const postUnLike = async () => {
    setLoading(true);
    axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/likeposts/${putId}`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
        },
      },
    }).then(function (response) {
      setLoading(false);
    });
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
    Kakao.Link.sendScrap({ requestUrl: location.href });
  };

  return (
    <Container>
      <h2 className="sr-only">좋아요 및 공유하기</h2>
      <HeartShare theme={theme}>
        <h3 className="sr-only">좋아요 버튼과 공유하기 버튼</h3>
        <div
          onClick={handleHeart}
          className={`circleBtn ${!heartClick ? "heartOff" : "heartOn"}`}
        >
          <FavoriteIcon />
        </div>
        <HeartCounter>{heartNum}</HeartCounter>
        <Share />
      </HeartShare>
      <MiniHeart onClick={handleHeart}>
        <h3 className="sr-only">미니 좋아요 버튼</h3>
        <MiniContainer
          className={`circleBtn ${!heartClick ? "heartOff" : "heartOn"}`}
        >
          <FavoriteIcon className="miniheart" />
          <MiniHeartCounter>{heartNum}</MiniHeartCounter>
        </MiniContainer>
      </MiniHeart>
    </Container>
  );
};

const Container = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 280px;
  height: 100%;
  @media screen and (max-width: 1025px) {
    position: absolute;
  }
`;
const HeartShare = styled.article<ThemeProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};
  border-radius: 40px;
  width: 70px;
  height: 150px;
  margin-right: 49px;

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
  .circleBtn:hover {
    color: ${PALLETS_LIGHT.MAIN};
    border: 1px solid ${PALLETS_LIGHT.MAIN};
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
    color: ${PALLETS_LIGHT.ICON};
    border: 1px solid ${PALLETS_LIGHT.ICON};
    background-color: none;
  }
  @media screen and (max-width: 1025px) {
    display: none;
  }
`;

const HeartCounter = styled.p`
  color: ${PALLETS_LIGHT.BORDER};
  font-size: 12px;
  font-weight: 700;
`;

const MiniHeart = styled.article`
  display: none;

  @media screen and (max-width: 1025px) {
    position: absolute;
    top: -130px;
    right: -380px;
    display: block;

    .miniheart {
      width: 12px;
      height: 12px;
    }
    .heartOn {
      color: ${PALLETS_LIGHT.BACKGROUND};
      border: none;
      background-color: ${PALLETS_LIGHT.MAIN};
    }
    .heartOff {
      color: ${PALLETS_LIGHT.BORDER};
    }
  }
  @media screen and (max-width: 840px) {
    top: -130px;
    right: -45vw;
  }
`;
const MiniContainer = styled.div`
  display: flex;
  width: 55px;
  height: 24px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${PALLETS_LIGHT.BORDER};
  border-radius: 20px;
  padding: 0 5px;
  box-sizing: border-box;
`;
const MiniHeartCounter = styled.p`
  font-size: 12px;
  font-weight: 700;
`;
