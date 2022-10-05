import styled from "@emotion/styled";
import { UDHashContainer, SeriesContainer, Carousel } from ".";
import { Intro } from "../../MyPage";
import { CommentFormContainer } from "../Comment";
import useIO from "@hooks/useIO";
import { API_ENDPOINT } from "@constants/index";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useReadingData from "@hooks/useReadingData";

import { PostStore } from "../Context";
import { MDviewer } from "../../Editor/EditorViewer";

export const DetailMain = () => {
  const { postid, postObj, loginUserId, loginUserName } = useContext(PostStore);
  const { id: postUserId, attributes: userData } = postObj.userid.data;
  const postUserNickname = userData.userid;

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
      url: `${API_ENDPOINT}/series-boxes?populate=*&filters[userid]=${postUserId}&filters[post][id]=${postid}`,
    });
    if (response.data.data[0]) {
      setSeriesData(response.data.data[0].attributes);
    }
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loginUserId && HandleReadingData();
    }
  };

  const HandleReadingData = () => {
    useReadingData({
      userName: loginUserName,
      userId: loginUserId,
      postId: postid,
    });
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
      <UDHashContainer userName={postUserNickname} loginUserId={loginUserId} />
      {seriesData.title && (
        <SeriesContainer
          seriesBox={seriesData}
          userName={postUserNickname}
          SeriesBoxPost={seriesData.post.data}
          currentPost={currentPost}
        />
      )}
      <MDviewer title="" contents={postObj.contents} />
      <div ref={setTarget}></div>
      <Intro username={postUserNickname} userdata={userData} />
      {seriesData.title && (
        <Carousel
          userName={postUserNickname}
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
