import styled from "@emotion/styled";
import { useContext } from "react";

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

import { PostStore } from "./Context";

interface ThemeProps {
  theme: Theme;
}

export const DetailContainer = () => {
  const { theme } = useContext(ThemeContext);
  const { postObj, random_interested, loginUserId, loginUserName } =
    useContext(PostStore);
  const { userid: postUserNickname } = postObj.userid.data.attributes;

  return (
    <div>
      {postObj.title ? (
        <div>
          <Header username={`${postUserNickname}`} user={true} />
          <ContentContainer>
            <LeftHeader
              loginUserId={loginUserId}
              loginUserName={loginUserName}
            />
            <DetailHeader
              loginUserId={loginUserId}
              loginUserName={loginUserName}
            />
            <RightHeader />
          </ContentContainer>
          {random_interested.length !== 0 && (
            <PostsContainer theme={theme}>
              <DetailCard interested={random_interested} />
            </PostsContainer>
          )}
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
};

const ContentContainer = styled.section`
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
