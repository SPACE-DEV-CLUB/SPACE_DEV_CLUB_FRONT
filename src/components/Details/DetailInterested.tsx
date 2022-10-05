import styled from "@emotion/styled";
import { useContext } from "react";

import { MEDIA_QUERY_END_POINT } from "@constants/index";
import { Post } from "@src/types/detail";

import { PostStore } from "./Context";
import { ListCard } from "../Home";

export const DetailInterested = () => {
  const { random_interested } = useContext(PostStore);
  return (
    <Container>
      <Title>관심 있을 만한 포스트</Title>
      <CardContainer>
        {random_interested.map((data: Post, index: number) => {
          // 게시글에 유저가 없는게 말이 안돼지만 일단 에러처리 해놓음
          if (data.attributes.userid.data === null)
            return <div>유저의 정보를 불러오지 못했습니다.</div>;
          const username = data.attributes.userid.data.attributes.userid;

          return (
            <ListCard
              key={`${data}_${index}`}
              // imageUrl={data.attributes.imageUrl}
              title={data.attributes.title}
              description={
                data.attributes.description || data.attributes.contents
              }
              comments={data.attributes.comments.data.length}
              username={username}
              // count={data.attributes.count}
              publishedAt={data.attributes.publishedAt}
              url={data.attributes.url}
              userImg={data.attributes.userid.data.attributes.profileimage}
            />
          );
        })}
      </CardContainer>
    </Container>
  );
};

const Container = styled.section`
  margin: 40px 0px;
`;
const Title = styled.h4`
  font-size: 30px;
  font-weight: 500;
  text-align: center;
`;
const CardContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  margin: 60px auto;
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
