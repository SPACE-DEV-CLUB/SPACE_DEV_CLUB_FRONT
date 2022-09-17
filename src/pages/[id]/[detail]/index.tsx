import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";

import qs from "qs";
import Cookies from "js-cookie";
import axios from "axios";

import { ErrorPage } from "@components/Common/ErrorPage";
import SkeletonLoading from "@src/components/Common/SkeletonLoading";
import { DetailContainer } from "@src/components/Details";
import { PostProvider } from "@src/components/Details/Context";
import { Hashtags, Post } from "@src/types/detail";
import { API_ENDPOINT } from "@src/constants";
import { shuffle } from "@src/utils/shuffle";

interface Props {
  postData: Post;
  random_interested: Post[];
}

const DetailsIndexPage: NextPage<Props> = ({ postData, random_interested }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient)
    return (
      <SkeletonContainer>
        <SkeletonLoading />
      </SkeletonContainer>
    );

  if (!postData) return <ErrorPage />;
  const { id: postid, attributes: postObj } = postData;
  const userCookieData = Cookies.get("user");
  const loginUserId = userCookieData && JSON.parse(userCookieData!).id;
  const loginUserName =
    userCookieData && JSON.parse(userCookieData!).attributes.userid;

  if (postObj.private && loginUserId !== postObj.userid.data.id)
    return <ErrorPage />;

  return (
    <>
      {postObj.title && (
        <NextSeo
          openGraph={{
            type: "website",
            title: `${postObj.title}`,
            description: `${postObj.contents}`,
            images: [
              {
                url: "https://user-images.githubusercontent.com/47337588/155908236-e0fa1e38-31fd-4616-a382-ef0431b7f362.png",
                alt: "Og Image Alt",
              },
            ],
          }}
        />
      )}
      <PostProvider
        postid={postid}
        postObj={postObj}
        random_interested={random_interested}
        loginUserId={loginUserId}
        loginUserName={loginUserName}
      >
        <DetailContainer />
      </PostProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { id: postUser, detail },
  } = context;
  const EncodingDetail = qs.stringify({ v: detail }).substring(2);
  const PublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&filters[userid][userid]=${qs
      .stringify({ v: postUser })
      .substring(2)}&filters[url]=${EncodingDetail}`
  );

  const UnPublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&publicationState=preview&filters[userid][userid]=${qs
      .stringify({ v: postUser })
      .substring(2)}&filters[url]=${EncodingDetail}`
  );

  const {
    data: { data: allDatas },
  } = await axios.get(`${API_ENDPOINT}/posts?populate=*`);

  const postData: Post =
    PublishedData.data.data.length === 0
      ? UnPublishedData.data.data[0]
      : PublishedData.data.data[0];

  const { attributes: postObj } = postData;

  const interested = postObj.hashtags
    ? allDatas.filter((details: Post) => {
        const hashtagArr = details.attributes.hashtags.data.map(
          (data) => data.attributes.name
        );
        const isInclude = postObj.hashtags.data.filter((data: Hashtags) =>
          hashtagArr.includes(data.attributes.name)
        );
        return isInclude.length > 0;
      })
    : [];

  const random_interested =
    interested.length >= 10
      ? shuffle(interested).slice(0, 10)
      : shuffle(interested);

  return {
    props: {
      postData,
      random_interested,
    },
  };
};
export default DetailsIndexPage;

const SkeletonContainer = styled.div`
  padding: 0 50px;
`;
