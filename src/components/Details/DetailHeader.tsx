import styled from '@emotion/styled';
import { UDHashContainer } from './UDHashContainer';
import { SeriesContainer } from './SeriesContainer';
import { Intro } from '../MyPage';
import { Carousel } from './Carousel';
import { Comment } from './Comment';
import useIO from '../../hooks/useIO';
import { API_ENDPOINT } from '../../constants';
import axios, { Method } from 'axios';
import { useData } from '../../hooks/useData';
import { useState, useEffect } from 'react';

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
}: DetailData) => {
  const [method, setMethod] = useState('post');
  const [putId, setPutId] = useState('');

  //사용자 읽기목록 받아오기
  const fetchdata = async () => {
    const response = await axios({
      method: 'get',
      url: `${API_ENDPOINT}/readingposts?populate=*&filters[userid][nickname]=ong`,
    });
    response.data.data.some((post: ReadingPost) => {
      if (post.attributes.postid.data.id === postid) {
        setPutId(`${post.id}`);
        setMethod('put');
        return true;
      }
    });
  };

  //읽기목록에 포스트 쏘기
  const postdata = async () => {
    axios({
      method: `${method}` as Method,
      url: `${API_ENDPOINT}/readingposts/${putId}`,
      data: {
        data: {
          userid: 4,
          postid: postid,
        },
      },
    }).then(function (response) {
      console.log(response);
    });
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await fetchdata();
      await postdata();
      console.log(`method: ${method}`);
      console.log(`put경로: ${putId}`);
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
      <UDHashContainer userName={userName} />
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
