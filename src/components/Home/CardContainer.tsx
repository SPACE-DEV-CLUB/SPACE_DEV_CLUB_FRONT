import styled from '@emotion/styled';
import { PostCard } from './Card';
import { MEDIA_QUERY_END_POINT } from '../../constants';
import { MAIN_CARD_DATA } from '../../data';

interface CARD_DATA_PROPS {
  imageUrl: string;
  postTitle: string;
  postDesc: string;
  tags: Array<string>;
  date: Date;
  comment: number;
  count: number;
}

export const CardContainer = ({ filter }: { filter: string }) => {
  const results = filterPosts(MAIN_CARD_DATA, filter);

  function filterPosts(MAIN_CARD_DATA: Array<CARD_DATA_PROPS>, text: String) {
    if (text === '이번 주') {
      return MAIN_CARD_DATA.filter(
        (post: CARD_DATA_PROPS) =>
          post.date >= new Date(Date.now() - 1000 * 3600 * 24 * 7)
      ).sort((a: CARD_DATA_PROPS, b: CARD_DATA_PROPS) => b.count - a.count);
    } else if (text === '이번 달') {
      return MAIN_CARD_DATA.filter(
        (post: CARD_DATA_PROPS) =>
          post.date.getMonth() === new Date().getMonth()
      ).sort((a: CARD_DATA_PROPS, b: CARD_DATA_PROPS) => b.count - a.count);
    } else if (text === '올 해') {
      return MAIN_CARD_DATA.filter(
        (post: CARD_DATA_PROPS) =>
          post.date.getFullYear() === new Date().getFullYear()
      ).sort((a: CARD_DATA_PROPS, b: CARD_DATA_PROPS) => b.count - a.count);
    }
    return MAIN_CARD_DATA.filter(
      (post: CARD_DATA_PROPS) =>
        post.date >= new Date(Date.now() - 1000 * 3600 * 24)
    ).sort((a: CARD_DATA_PROPS, b: CARD_DATA_PROPS) => b.count - a.count);
  }

  return (
    <Container>
      {results.map((e: CARD_DATA_PROPS, index: number) => (
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
