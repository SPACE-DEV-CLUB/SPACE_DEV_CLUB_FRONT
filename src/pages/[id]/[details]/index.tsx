import { NextPage } from "next";
import styled from "@emotion/styled";
import Head from "next/head";

import {
  DetailHeader,
  LeftHeader,
  RightHeader,
  DetailCard,
} from "@components/Details";

import { Header } from "@components/Common/Header";

import { Theme } from "@styles/theme";
import { createContext, useContext, useEffect } from "react";
import { ThemeContext } from "@pages/_app";
import { useRouter } from "next/router";
import { useData } from "@hooks/useData";
import { ErrorPage } from "@components/Common/ErrorPage";
import { userInfo } from "../../../types/Main";
import Cookies from "js-cookie";
import { Post } from "@src/types/Detail";
import SkeletonLoading from "@src/components/Common/SkeletonLoading";

interface ThemeProps {
  theme: Theme;
}

let postid = 0;
let postObj = {
  title: "",
  contents: "",
  url: "",
  likeposts: {
    data: [],
  },
  comments: {
    data: [
      {
        id: 0,
        attributes: {
          userid: 0,
          postid: 0,
          content: "",
          createdAt: "",
          depth: 0,
          order: 0,
          group: 0,
          is_deleted: false,
        },
      },
    ],
  },
  userid: {
    data: {
      id: 0,
      attributes: {},
    },
  },
  createdAt: "",
  hashtags: {
    data: [
      {
        id: 0,
        attributes: {
          name: "",
          createdAt: "",
          description: "",
          image: "",
        },
      },
    ],
  },
};

export const PostContext = createContext({
  postid: postid,
  postObj: postObj,
});

const DetailsIndexPage: NextPage = () => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const userName = router.query.id;
  const userDetails = router.query.details;

  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);

  const { data: DetailData, error: DetailError } = useData(
    "posts",
    "populate=*"
  );

  if (!DetailData)
    return (
      <SkeletonContainer>
        <SkeletonLoading />
      </SkeletonContainer>
    );
  if (DetailError) return <ErrorPage />;

  const userCookieData = Cookies.get("user");

  const loginUserId = userCookieData && JSON.parse(userCookieData!).id;
  const loginUserName =
    userCookieData && JSON.parse(userCookieData!).attributes.userid;

  let user: userInfo = {
    email: "",
    userid: "",
    profile: "",
    profileimage: "",
    facebook: "",
    home: "",
    twitter: "",
    github: "",
    velogtitle: "",
    profilename: "",
    aboutme: "",
    snsemail: "",
  };

  DetailData.data.some((details: Post) => {
    if (
      userDetails === details.attributes.url &&
      userName === details.attributes.userid.data.attributes.userid
    ) {
      postid = details.id;
      postObj = details.attributes;
      user = details.attributes.userid.data.attributes;
      return true;
    }
  });

  const interested = DetailData.data.filter((details: Post) => {
    const hashtagArr = details.attributes.hashtags.data.map(
      (data) => data.attributes.name
    );
    const isInclude = postObj.hashtags.data.filter((data) =>
      hashtagArr.includes(data.attributes.name)
    );
    return isInclude.length > 0;
  });

  function shuffle(arr: Post[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
  const random_interested =
    interested.length >= 10
      ? shuffle(interested).slice(0, 10)
      : shuffle(interested);

  return (
    <PostContext.Provider value={{ postid, postObj }}>
      <Head>
        <title>{postObj.title}</title>
        <meta name="description" content={postObj.contents} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {postObj.title ? (
        <div>
          <Header username={`${loginUserName}`} user={true} />
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
  );
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
