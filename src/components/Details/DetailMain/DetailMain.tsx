import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";

import { SeriesBox } from "@src/types/detail";
import useReadingData from "@hooks/useReadingData";
import useIO from "@hooks/useIO";
import { seriesInit } from "@src/constants/detail";

import { UDHashContainer, SeriesContainer, Carousel } from ".";
import { useGetSeriesData } from "./helper";
import { CommentFormContainer } from "../Comment";
import { PostStore } from "../Context";
import { Intro } from "../../MyPage";
import { MDviewer } from "../../Editor/EditorViewer";

export const DetailMain = () => {
  const { postid, postObj, loginUserId, loginUserName } = useContext(PostStore);
  const { attributes: userData } = postObj.userid.data;
  const postUserNickname = userData.userid;
  const { seriesData, currentPost } = useGetSeriesData();

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
