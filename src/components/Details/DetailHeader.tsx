import styled from "@emotion/styled";
import { UDHashContainer, SeriesContainer, Carousel } from ".";
import { Intro } from "../MyPage";
import { CommentFormContainer } from "./Comment";
import useIO from "@hooks/useIO";
import { API_ENDPOINT } from "@constants/index";
import axios, { Method } from "axios";
import { userInfo } from "../../types/Main";
import { PostContext } from "@pages/[id]/[details]";
import { useContext, useEffect, useState } from "react";
import { MDviewer } from "../Editor/EditorViewer";

interface Props {
  userName: string | string[] | undefined;
  userdata: userInfo;
  loginUserId: number | undefined;
  loginUserName: string | string[] | undefined;
}

interface ReadingPost {
  id: number;
  attributes: {
    postid: {
      data: {
        id: number;
      };
    };
  };
}

export const DetailHeader = ({
  userName,
  userdata,
  loginUserId,
  loginUserName,
}: Props) => {
  const { postid, postObj } = useContext(PostContext);
  const userId = postObj.userid.data.id;
  const [currentPost, setCurrentPost] = useState(1);
  const [seriesData, setSeriesData] = useState({
    title: "",
    userid: {
      data: {
        id: 0,
        attributes: {
          userid: "",
        },
      },
    },
    post: {
      data: [{ id: 0, attributes: { title: "", url: "" } }],
    },
  });

  useEffect(() => {
    GetSeries();
    if (seriesData.title) {
      seriesData.post.data.filter((data, i) => {
        if (data.id === postid) {
          setCurrentPost(i + 1);
          return true;
        }
      })[0];
    }
  }, [postid]);

  const GetSeries = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/series-boxes?populate=*&filters[userid]=${userId}&filters[post][id]=${postid}`,
    });
    if (response.data.data[0]) {
      setSeriesData(response.data.data[0].attributes);
    }
  };

  const getReadingData = async () => {
    let putId = 0;
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/readingposts?populate=*&filters[userid][userid]=${loginUserName}`,
    });
    const handleOverlap = response.data.data.some((post: ReadingPost) => {
      if (post.attributes.postid.data !== null) {
        if (post.attributes.postid.data.id === postid) {
          putId = post.id;
          return true;
        }
      }
    });
    handleOverlap
      ? postReadingData("put", `${putId}`)
      : postReadingData("post");
  };

  const postReadingData = async (method: string, putid: string = "") => {
    axios({
      method: method as Method,
      url: `${API_ENDPOINT}/readingposts/${putid}`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
        },
      },
    });
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loginUserId && getReadingData();
    }
  };

  const { setTarget } = useIO({
    root: null,
    rootMargin: "0px",
    threshold: 1,
    onIntersect,
  });

  return (
    <Header>
      <h2>{postObj.title}</h2>
      <UDHashContainer userName={userName} loginUserId={loginUserId} />
      {seriesData.title && (
        <SeriesContainer
          seriesBox={seriesData}
          userName={userName}
          SeriesBoxPost={seriesData.post.data}
          currentPost={currentPost}
        />
      )}
      <MDviewer title="" contents={postObj.contents} />
      <div ref={setTarget}></div>
      <Intro username={userName} userdata={userdata} />
      {seriesData.title && (
        <Carousel
          userName={userName}
          SeriesBoxPost={seriesData.post.data}
          currentPost={currentPost}
        />
      )}

      <CommentFormContainer loginUserId={loginUserId} />
    </Header>
  );
};

const Header = styled.section`
  display: flex;
  width: 768px;
  margin: 0 3vw;
  flex-direction: column;
  margin-top: 32px;
  h2 {
    font-size: 48px;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 840px) {
    width: 100vw;
  }
`;
