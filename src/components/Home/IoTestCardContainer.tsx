import styled from '@emotion/styled';
import { PostCard } from './Card';
import { MEDIA_QUERY_END_POINT } from '../../constants';
import { MAIN_CARD_DATA } from '../../data';
import React, { useState } from 'react';
import useIntersectionObserver from '../../hooks/useIO';

export const TestCardContainer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState(MAIN_CARD_DATA.slice(0, 10));

  const testFetch = (delay = 1000) =>
    new Promise((res) => setTimeout(res, delay));

  const getMoreItem = async () => {
    setIsLoaded(true);
    await testFetch();
    setItemIndex((i) => i + 1);
    setData((data) => data.concat(MAIN_CARD_DATA.slice(itemIndex, itemIndex + 5)));
    console.log(itemIndex);
    setIsLoaded(false);
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      //await issue...
      await getMoreItem();
      // observer.observe(entry.target);
    }
  };

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    onIntersect,
  });

  return (
    <Container>
      {data.map((e, index) => (
        <PostCard
          key={index}
          imageUrl="/image/sample.jpeg"
          postTitle={e.postTitle}
          postDesc={e.postDesc}
          tags={e.tags}
          date={e.date}
          comment={e.comment}
          count={e.count}
          username="deli-ght"
          thumbnail="/image/post_thumbnail.png"
        />
      ))}
      <div ref={setTarget}>{isLoaded && <Loader>Loading..</Loader>}</div>
    </Container>
  );
};

const Loader = styled.div`
  width: 100%;
  height: 50px;
  bottom: 0;
  right: 0;
  line-height: 50px;
  position: absolute;
  text-align: center;
  align-items: center;
  color: white;
  background: black;
  font-size: 40px;
`;

const Container = styled.section`
  position: relative;
  padding-bottom: 50px;
  // 로딩 컴포넌트 만들면 위에 2개 삭제
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin: 0 auto;
  @media (min-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.LARGE};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    grid-template-columns: repeat(5, 1fr);
    gap: 32px;
    max-width: 1728px;
  }
`;

const Loading = styled.div``;
