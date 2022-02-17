import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { API_ENDPOINT, PALLETS_LIGHT } from "@constants/index";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { Theme } from "@styles/theme";
import { useContext } from "react";
import { ThemeContext } from "@pages/_app";
import axios, { Method } from "axios";

import { handleDate } from "../../utils/date";
import { breakpoints } from "@mui/system";

interface ThemeProps {
  theme: Theme;
}

interface LikePost {
  likepost: never[];
  postid: number;
  loginUserId: number | undefined;
  loginUserName: string | string[] | undefined;
}

interface ILikePost {
  id: number;
  attributes: {
    postid: {
      data: [
        {
          id: number;
        }
      ];
    };
  };
}
export const LeftHeader = ({
  likepost,
  postid,
  loginUserId,
  loginUserName,
}: LikePost) => {
  const { theme } = useContext(ThemeContext);
  const [heartNum, setHeartNum] = useState(likepost.length);
  const [heartClick, setHeartClick] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [putId, setPutId] = useState(0);

  useEffect(() => {
    loginUserId && getLikeData();
  }, []);

  // const fetcher = (url: string) =>
  //   axios.put(url).then((res) => console.log(res.data));
  // const { data, error } = useSWR(`${API_ENDPOINT}/posts`, fetcher);

  // if (!data) return <div>로딩중</div>;
  // if (error) return <div>에러</div>;

  // console.log(data, "sdfsdf");

  const handleHeart = () => {
    if (!loginUserId) {
      alert("로그인이 필요합니다.");
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
      url: `${API_ENDPOINT}/likeposts?populate=*&filters[userid][userid]=${loginUserName}`,
    });
    const handleOverlap = response.data.data.some((post: ILikePost) => {
      if (post.attributes.postid.data[0].id === postid) {
        setPutId(post.id);
        return true;
      }
    });
    handleOverlap && setHeartClick(true);
  };

  const postLike = async () => {
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
      console.log(response);
      setPutId(response.data.data.id);
    });
  };

  const postUnLike = async () => {
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
      console.log(response);
    });
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
  a {
    color: ${PALLETS_LIGHT.ICON};
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
    color: ${PALLETS_LIGHT.ICON};
    border: 1px solid ${PALLETS_LIGHT.ICON};
    background-color: none;
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
    transform: translateX(70px) translateY(-10px);
  }
  .ShareItem2 {
    transform: translateX(95px) translateY(40px);
  }
  .ShareItem3 {
    transform: translateX(70px) translateY(90px);
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
