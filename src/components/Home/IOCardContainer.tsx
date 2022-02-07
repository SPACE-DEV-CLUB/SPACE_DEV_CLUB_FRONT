import { fetcher } from '../../utils/fetcher';
import useSWRInfinite from 'swr/infinite';
import { API_ENDPOINT } from '../../constants';
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import qs from 'qs';
import { PostCard } from '.';
import { MEDIA_QUERY_END_POINT } from '../../constants';

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

export const IOCardContainer = ({
  filter,
  username,
}: {
  filter: string;
  username: undefined;
}) => {
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
    console.log(`window.innerWidth, ${window.innerWidth}`);
    console.log(`PAGE_SIZE ${PAGE_SIZE}`);
  }, []);

  // const moment = require('moment');

  // const firstDayOfTheMonth = moment().startOf('month').format('2022-02-01'); //2021-04-01
  // const lastDayOfTheMonth = moment().endOf('month').format('2022-02-28'); //2021-04-30
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
  //read, like

  // 2022-02-07 00:00 formatDate(today) <  2022-02-07 13:20
  // Mon Feb 07 2022 13:23:08 GMT+0900 (한국 표준시)
  // Sun Feb 06 2022 13:23:08 GMT+0900 (한국 표준시)
  // 2022-02-06 00:00 ~ 2022-02-08
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;
    const query = qs.stringify(
      {
        pagination: {
          page: pageIndex,
          pageSize: PAGE_SIZE,
        },
        populate: ['*'],
        sort: ['publishedAt:desc'],
        filters: {
          publishedAt: {
            $gte: `${formatDate(filterDay)}`,
            $lte: `${formatDate(today)}`,
          },
          userid: {
            nickname: {
              $eq: username,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    return `${API_ENDPOINT}/posts?${query}`;
  };

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = useRef<boolean>(false);

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (size == 1) isReachingEnd.current = false;
    if (!target || isReachingEnd.current) return;
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    });
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [data, target]);

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      setSize((prev) => prev + 1);
      isReachingEnd.current =
        data === undefined
          ? false
          : isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE);
    }
  };

  return (
    <>
      <Container>
        {data &&
          data
            .filter((e, i) => {
              if (size == 1) return true;
              else {
                return i !== 0;
              }
            })
            .map((loaded) => {
              return loaded.data.map((e: any, i: number) => (
                <PostCard
                  key={`${e}_${i}`}
                  imageUrl={e.attributes.imageUrl}
                  title={e.attributes.title}
                  contents={e.attributes.contents}
                  comments={e.attributes.comments}
                  username={'deli-ght'}
                  count={e.attributes.count}
                  publishedAt={e.attributes.publishedAt}
                />
              ));
            })}
      </Container>
      <TargetElement ref={setTarget}>
        {isValidating && !isReachingEnd.current && <div>로딩중</div>}
      </TargetElement>
    </>
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

const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`;
