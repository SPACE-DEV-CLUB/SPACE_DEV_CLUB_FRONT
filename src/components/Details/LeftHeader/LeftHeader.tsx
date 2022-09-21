import styled from "@emotion/styled";
import { useEffect, useState, useContext } from "react";
import axios, { Method } from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useSWRConfig } from "swr";

import { API_ENDPOINT, PALLETS_LIGHT } from "@constants/index";
import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";

import { Share } from "./Share";
import { PostStore } from "../Context";
import { getLikeData, getLoggedUserIsLike } from "./helper";

interface ThemeProps {
  theme: Theme;
}

export const LeftHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { postid, loginUserId, loginUserName } = useContext(PostStore);
  const [heartNum, setHeartNum] = useState(0);
  const [heartClick, setHeartClick] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [loggedUserLikepostId, setLoggedUserLikepostId] = useState(0);
  const [loading, setLoading] = useState(false);

  // const { mutate } = useSWRConfig();

  console.log(postid, loginUserId, loginUserName);

  useEffect(() => {
    getLikeData(handleHeartNum, postid);
    loginUserId &&
      getLoggedUserIsLike(
        loginUserId,
        postid,
        LoggedUserIsLike,
        handleLoggedUserLikepost
      );
  }, []);

  const handleHeartNum = (currentHeartNum: number) => {
    setHeartNum(currentHeartNum);
  };

  const LoggedUserIsLike = () => {
    setHeartClick(true);
  };

  const handleLoggedUserLikepost = (likepostId: number) => {
    setLoggedUserLikepostId(likepostId);
  };

  const handleHeart = () => {
    if (!loginUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (loading) {
      alert("로딩중입니다. 잠시만 기다려주세요.");
      return;
    }
    const num = heartClick ? heartNum - 1 : heartNum + 1;
    heartClick ? postUnLike() : postLike();
    setHeartClick(!heartClick);
    handleHeartNum(num);
  };

  const postLike = async () => {
    setLoading(true);
    await axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/likeposts`,
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

  const postUnLike = async () => {
    setLoading(true);
    try {
      await axios({
        method: "delete" as Method,
        url: `${API_ENDPOINT}/likeposts/${loggedUserLikepostId}`,
      }).then(function (response) {
        setLoading(false);
      });

      await axios({
        method: "put" as Method,
        url: `${API_ENDPOINT}/posts/${postid}`,
        data: {
          data: {
            likes: heartNum - 1,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
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
  /* @media screen and (max-width: 1025px) {
    display: none;
  } */
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
