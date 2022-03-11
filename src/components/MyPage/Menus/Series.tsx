import styled from "@emotion/styled"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "@constants/index"
import { handleDate } from "@utils/date"
import { fetcher } from "@utils/fetcher"
import { SeriesCard } from "../Series/SeriesCard"
import BlankPage from "./BlankPage"
import useSWRInfinite from "swr/infinite"
import { useEffect, useRef, useState } from "react"
import qs from "qs"

interface SeriesProps {
  username: string | string[] | undefined
}

const PAGE_SIZE = 2

export const Series = ({ username }: SeriesProps) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null
    const query = qs.stringify(
      {
        sort: ["updatedAt:desc"],
        pagination: {
          page: pageIndex + 1,
          pageSize: PAGE_SIZE,
        },
        populate: ["post", "userid"],
        filters: {
          userid: {
            userid: {
              $eq: username,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    )
    return `${API_ENDPOINT}/series-boxes?${query}`
  }

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

  const isEmpty = data?.[0]?.data.length === 0
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
    <SeriesContainer>
      {data ? (
        data.map((cards, index) =>
          cards.data.map((e: any, i: number) => {
            const { title, updatedAt } = e.attributes
            return (
              <SeriesCard
                key={i}
                imageUrl={e.attributes.post.data[0]?.attributes.url || ""}
                postTitle={title}
                count={e.attributes.post.data.length}
                updateDate={handleDate(updatedAt)}
                username={username}
              />
            )
          }),
        )
      ) : (
        <BlankPage dataname={"시리즈"} />
      )}
      {data && <TargetElement ref={setTarget} />}
    </SeriesContainer>
  )
}

const SeriesContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`
