import styled from '@emotion/styled';
import { UDHashContainer } from './UDHashContainer';
import { SeriesContainer } from './SeriesContainer';
import { Intro } from '../MyPage';
import { Carousel } from './Carousel';
import { Comment } from './Comment';
import useIO from '../../hooks/useIO';
import { API_ENDPOINT } from '../../constants';
import axios, { Method } from 'axios';

interface DetailData {
  title: string;
  contents: string;
  userName: string | string[] | undefined;
  comments: {
    id: number;
    attributes: {
      userid: number;
      postid: number;
      content: string;
      createdAt: string;
      depth: number;
      order: number;
      group: number;
      is_deleted: boolean;
    };
  }[];
  postid: number;
}

export const DetailHeader = ({
  title,
  contents,
  userName,
  comments,
  postid,
}: DetailData) => {
  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      axios
        .post(`${API_ENDPOINT}/readingposts/`, {
          data: {
            userid: 4,
            postid: postid,
          },
        })
        .then((response) => {
          console.log(response);
        });
    }
  };

  const { setTarget } = useIO({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <Header>
      <h2>{title}</h2>
      <UDHashContainer userName={userName} />
      <SeriesContainer />
      <div>{contents}</div>
      {/* <div ref={setTarget}></div> */}
      <Intro />
      <Carousel />
      <Comment comments={comments} />
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
