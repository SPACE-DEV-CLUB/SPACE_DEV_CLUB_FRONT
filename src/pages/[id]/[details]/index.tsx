import styled from "@emotion/styled";
import { createContext, useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import qs from "qs";
import Cookies from "js-cookie";
import axios from "axios";

import {
  DetailHeader,
  LeftHeader,
  RightHeader,
  DetailCard,
} from "@components/Details";
import { Header } from "@components/Common/Header";
import { ErrorPage } from "@components/Common/ErrorPage";
import { ThemeContext } from "@pages/_app";
import { Theme } from "@styles/theme";
import { userInfo } from "@src/types/Main";
import { Hashtags, Post, PostAttr } from "@src/types/Detail";
import SkeletonLoading from "@src/components/Common/SkeletonLoading";
import { API_ENDPOINT } from "@src/constants";
import { postInit } from "@src/constants/detail";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  data: Post;
  id: userInfo;
  allDatas: Post[];
}

interface Context {
  postid: number;
  postObj: PostAttr;
}

export const PostContext = createContext<Context>({
  postid: 0,
  postObj: postInit,
});

const DetailsIndexPage: NextPage<Props> = ({ data, id, allDatas }) => {
  const [isClient, setIsClient] = useState(false);
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const userName = router.query.id;

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

  const userCookieData = Cookies.get("user");

  const loginUserId = userCookieData && JSON.parse(userCookieData!).id;
  const loginUserName =
    userCookieData && JSON.parse(userCookieData!).attributes.userid;

  const postid = data.id;
  const postObj: PostAttr = data.attributes;
  const user = id;

  if (postObj.private && loginUserId !== postObj.userid.data.id)
    return <ErrorPage />;

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

  function shuffle(arr: Post[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
  const random_interested =
    interested.length >= 10
      ? shuffle(interested).slice(0, 10)
      : shuffle(interested);

  return (
    <div>
      {postObj.title && (
        <NextSeo
          openGraph={{
            type: "website",
            title: `${data.attributes.title}`,
            description: `${data.attributes.contents}`,
            images: [
              {
                url: "https://user-images.githubusercontent.com/47337588/155908236-e0fa1e38-31fd-4616-a382-ef0431b7f362.png",
                alt: "Og Image Alt",
              },
            ],
          }}
        />
      )}

      <PostContext.Provider value={{ postid, postObj }}>
        {postObj.title ? (
          <div>
            <Header username={`${id}`} user={true} />
            <DetailContainer>
              <LeftHeader
                loginUserId={loginUserId}
                loginUserName={loginUserName}
              />
              <DetailHeader
                userName={userName}
                userdata={user}
                loginUserId={loginUserId}
                loginUserName={loginUserName}
              />
              <RightHeader />
            </DetailContainer>
            {random_interested.length !== 0 && (
              <PostsContainer theme={theme}>
                <DetailCard interested={random_interested} />
              </PostsContainer>
            )}
          </div>
        ) : (
          <ErrorPage />
        )}
      </PostContext.Provider>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const id = context.query.id;
  const detail = qs.stringify({ v: context.query.details }).substring(2);
  const PublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&filters[userid][userid]=${qs
      .stringify({ v: id })
      .substring(2)}&filters[url]=${detail}`
  );

  const UnPublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&publicationState=preview&filters[userid][userid]=${qs
      .stringify({ v: id })
      .substring(2)}&filters[url]=${detail}`
  );

  const detailRes = await axios.get(`${API_ENDPOINT}/posts?populate=*`);

  let data =
    PublishedData.data.data.length === 0
      ? UnPublishedData.data.data[0]
      : PublishedData.data.data[0];
  if (!data) data = { attributes: {} };
  const allDatas = detailRes.data.data;

  return {
    props: {
      data,
      id,
      allDatas,
    },
  };
};
export default DetailsIndexPage;

const SkeletonContainer = styled.div`
  padding: 0 50px;
`;
const DetailContainer = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const PostsContainer = styled.div<ThemeProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.BACKGROUND};
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 32px;
  margin-top: 50px;
`;
