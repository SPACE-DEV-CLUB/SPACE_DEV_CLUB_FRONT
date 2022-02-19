import useSWRInfinite from "swr/infinite"
import { useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import qs from "qs"
import { MEDIA_QUERY_END_POINT, API_ENDPOINT } from "@constants/."
import { fetcher } from "@utils/fetcher"
import { ListCard } from "."

let PAGE_SIZE = 3

interface CardContainerProps {
  filter: string
  username?: string | null 
}

export const ListCardContainer = ({
  filter,
  username
}: CardContainerProps) => {

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
      : 1
  }, [])

  const getKey = (pageIndex: number, previousPageData: any) => {

    if (previousPageData && !previousPageData.data) return null

    const query = qs.stringify(
      {
        pagination: {
          page: pageIndex,
          pageSize: PAGE_SIZE,
        },
        populate: "*",
        sort: ["publishedAt:desc"],
        filters: {
          userid: {
            email: {
              $eq: username,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    return `${API_ENDPOINT}/${filter}?${query}`;
  };

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  )

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd = useRef<boolean>(false)

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  useEffect(() => {
    if (size == 1) isReachingEnd.current = false
    if (!target || isReachingEnd.current) return
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    })
    observer.observe(target)
    return () => observer && observer.disconnect()
  }, [data, target])

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      setSize((prev) => prev + 1)
      isReachingEnd.current =
        data === undefined
          ? false
          : isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE)
    }
  }

  return (
    <>
      <Container>
        {data &&
          data.map((loaded) => {
            return loaded.data.map((e: any, i: number) => (
              <ListCard
                key={`${e}_${i}`}
                title={e.attributes.postid.data.attributes.title}
                contents={e.attributes.postid.data.attributes.contents}
                comments={e.attributes.postid.data.attributes.comments}
                username={e.attributes.userid.data.attributes.userid}
                count={e.attributes.postid.data.attributes.count}
                publishedAt={e.attributes.postid.data.attributes.publishedAt}
              /> 
            ))
          })}
      </Container>
      <TargetElement ref={setTarget}>
        {isValidating && !isReachingEnd.current && <div>로딩중</div>}
      </TargetElement>
    </>
  )
}
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
@media (min-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
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
`

const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`
