import styled from "@emotion/styled";
import { UDHashContainer } from "./UDHashContainer";
import { SeriesContainer } from "./SeriesContainer";
import { Intro } from "../MyPage";
import { Carousel } from "./Carousel";
import { Comment } from "./Comment";
import useIO from "../../hooks/useIO";
import { API_ENDPOINT } from "../../constants";
import axios, { Method } from "axios";


interface DetailData {
  title: string;
  contents: string;
  userName: string | string[] | undefined;
  createdAt: string;
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
  title,
  contents,
  userName,
  comments,
  postid,
  createdAt,
}: DetailData) => {
  const getReadingData = async (nickname: string) => {
    let putId = 0;
    const response = await axios({
      method: 'get',
      url: `${API_ENDPOINT}/readingposts?populate=*&filters[userid][nickname]=${nickname}`,
    });
    const handleOverlap = response.data.data.some((post: ReadingPost) => {
      if (post.attributes.postid.data.id === postid) {
        putId = post.id;
        return true;
      }
    });
    handleOverlap
      ? postReadingData('put', `${putId}`)
      : postReadingData('post');
  };

  const postReadingData = async (method: string, putid: string = '') => {
    axios({
      method: method as Method,
      url: `${API_ENDPOINT}/readingposts/${putid}`,
      data: {
        data: {
          userid: 4,
          postid: postid,
        },
      },
    }).then(function (response) {
      console.log(response);
      console.log(`method : ${method}`);
      console.log(`data-id : ${putid}`);
      console.log(`post-id : ${postid}`);
    });
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      getReadingData('ong');
    }
  };

  const { setTarget } = useIO({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });

  return (
    <Header>
      <h2>{title}</h2>
      <UDHashContainer userName={userName} createdAt={createdAt} />
      <SeriesContainer />
      <div>{contents}</div>
      <div ref={setTarget}></div>
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
