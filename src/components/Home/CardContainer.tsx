import styled from '@emotion/styled';
import { PostCard } from './Card';
import { MEDIA_QUERY_END_POINT } from '../../constants';
import { useData } from '../../hooks/useData';

export const CardContainer = ({ filter }: { filter: string }) => {
  const { data, error } = useData('posts');
  if (!data) return <h1>데이터 로딩중..</h1>;
  const filteredPosts = filterPosts(data.data, filter);
  function filterPosts(data: any, text: String) {
    if (text === '오늘') {
      return data
        .filter(
          (post: any) =>
            new Date(post.attributes.publishedAt) >=
            new Date(Date.now() - 1000 * 3600 * 24)
        )
        .sort((a: any, b: any) => b.attributes.count - a.attributes.count);
    } else if (text === '이번 주') {
      return data
        .filter(
          (post: any) =>
            new Date(post.attributes.publishedAt) >=
            new Date(Date.now() - 1000 * 3600 * 24 * 7)
        )
        .sort((a: any, b: any) => b.attributes.count - a.attributes.count);
    } else if (text === '이번 달') {
      return data
        .filter(
          (post: any) =>
            new Date(post.attributes.publishedAt).getMonth() ===
            new Date().getMonth()
        )
        .sort((a: any, b: any) => b.attributes.count - a.attributes.count);
    } else if (text === '올 해') {
      return data
        .filter(
          (post: any) =>
            new Date(post.attributes.publishedAt).getFullYear() ===
            new Date().getFullYear()
        )
        .sort((a: any, b: any) => b.attributes.count - a.attributes.count);
    }
    return data.sort(
      (a: any, b: any) =>
        new Date(b.attributes.publishedAt).getTime() -
        new Date(a.attributes.publishedAt).getTime()
    );
  }

  return (
    <Container>
      {filteredPosts.map((e: any, index: number) => (
        <PostCard
          key={`${e}_${index}`}
          imageUrl={e.attributes.imageUrl}
          title={e.attributes.title}
          contents={e.attributes.contents}
          comments={e.attributes.comments}
          username={'deli-ght'}
          count={e.attributes.count}
          publishedAt={e.attributes.publishedAt}
        />
      ))}
    </Container>
  );
};

const Container = styled.section`
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
