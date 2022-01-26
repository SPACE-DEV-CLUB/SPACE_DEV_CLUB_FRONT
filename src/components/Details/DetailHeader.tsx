import styled from "@emotion/styled";
import { UDHashContainer } from "./UDHashContainer";
import { SeriesContainer } from "./SeriesContainer";
import { Intro } from "../MyPage";
import { Carousel } from "./Carousel";
import { Comment } from "./Comment";

interface DetailData {
  title: string;
  contents: string;
  userName: string | string[] | undefined;
}

export const DetailHeader = ({ title, contents, userName }: DetailData) => {
  return (
    <Header>
      <h2>{title}</h2>
      <UDHashContainer userName={userName} />
      <SeriesContainer />
      <div>{contents}</div>
      <Intro />
      <Carousel />
      <Comment />
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
