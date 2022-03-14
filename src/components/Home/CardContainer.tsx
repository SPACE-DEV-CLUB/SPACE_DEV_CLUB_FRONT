import useSWRInfinite from 'swr/infinite';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import qs from 'qs';
import { fetcher } from '@utils/fetcher';
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from '@constants/.';
import { ListCard, ListCardLoading } from '.';
import { PostProps } from '@src/types/Main';

let PAGE_SIZE = 3;

const formatDate = (date: Date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
};

export const CardContainer = ({ filter }: { filter: string }) => {
  useEffect(() => {
    PAGE_SIZE = window.matchMedia(
      `(min-width: ${MEDIA_QUERY_END_POINT.XLARGE})`
    ).matches
      ? 5
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.LARGE})`).matches
      ? 4
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.TABLET})`)
          .matches
      ? 3
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.MOBILE})`)
          .matches
      ? 2
      : 1;
  }, []);

  const today = new Date();
  today.setDate(today.getDate() + 1);

  const filterDay = new Date();
  if (filter === '오늘') {
    filterDay.setDate(filterDay.getDate() - 1);
  } else if (filter === '이번 주') {
    filterDay.setDate(filterDay.getDate() - 7);
  } else if (filter === '이번 달') {
    filterDay.setDate(1);
  } else if (filter === '올 해') {
    filterDay.setFullYear(filterDay.getFullYear(), 0, 1);
  } else {
    filterDay.setFullYear(2021, 0, 1);
  }

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;

    const query = qs.stringify(
      {
        pagination: {
          page: pageIndex + 1,
          pageSize: PAGE_SIZE,
        },
        populate: ['userid', 'comments', 'likeposts'],
        sort: ['publishedAt:desc'],
        filters: {
          publishedAt: {
            $gte: `${formatDate(filterDay)}`,
            $lte: `${formatDate(today)}`,
          },
          private: false,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    return `${API_ENDPOINT}/posts?${query}`;
  };

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data &&
      data.reduce((ac, el) => ac + el.data.length, 0) ===
        data[0].meta.pagination.total);
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target || isReachingEnd) return;
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [data, target]);

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      setSize((prev) => prev + 1);
    }
  };

  return (
    <>
      <Container>
        {data &&
          data.map((loaded) => {
            return loaded.data.map((e: PostProps, i: number) => {
              const {
                title,
                contents,
                comments,
                userid,
                likeposts,
                publishedAt,
                url,
                description,
              } = e.attributes;

              return (
                <ListCard
                  key={`${e}_${i}`}
                  title={title}
                  description={description || contents}
                  comments={comments.data.length}
                  username={userid.data.attributes.userid}
                  userImg={userid.data.attributes.profileimage}
                  count={likeposts.data.length}
                  publishedAt={publishedAt}
                  url={url}
                />
              );
            });
          })}
      </Container>
      <TargetElement ref={setTarget}>
        {isValidating && !isReachingEnd && (
          <Container>
            {[...Array(PAGE_SIZE)].map((e, i) => (
              <ListCardLoading key={i} />
            ))}
          </Container>
        )}
      </TargetElement>
    </>
  );
};
const Container = styled.section`
  display: grid;
  margin: 0 auto 16px;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  margin-bottom: 32px;
  max-width: 1728px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-bottom: 32px;
    max-width: 1376px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    margin: 0 auto 16px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
`;

const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`;
