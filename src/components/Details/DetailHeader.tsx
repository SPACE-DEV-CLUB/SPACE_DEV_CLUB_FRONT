import styled from "@emotion/styled";
import { UDHashContainer } from "./UDHashContainer";
import { SeriesContainer } from "./SeriesContainer";
import { Intro } from "../MyPage";
import { Carousel } from "./Carousel";
import { Comment } from "./Comment";

export const DetailHeader = () => {
  return (
    <Header>
      <h2>글제목</h2>
      <UDHashContainer />
      <SeriesContainer />
      <Intro />
      <Carousel />
      <Comment />
    </Header>
  );
};

const Header = styled.section`
  display: flex;
  flex: 2;
  flex-direction: column;
  margin-top: 32px;
  h2 {
    font-size: 48px;
    margin-bottom: 32px;
  }
`;
