import { MyCard } from "../MyPage/MyCard"
import CardLoading from "./CardLoading"
import { fetcher } from "@utils/fetcher"
import useSWRInfinite from "swr/infinite"
import { API_ENDPOINT } from "@constants/index"
import { useEffect, useRef, useState, memo } from "react"
import styled from "@emotion/styled"
import qs from "qs"
import BlankPage from "../MyPage/Menus/BlankPage"
import Cookies from "js-cookie"

const PAGE_SIZE = 2

interface ContentDataProps {
  username?: string | string[] | undefined
  tag: string
  search?: string | undefined
}

const ContentData = ({
  tag,
  search = undefined,
  username = undefined,
}: ContentDataProps) => {
  const loginUser = JSON.parse(Cookies.get("user") || "{}")

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null
    const query = qs.stringify(
      {
        sort: ["publishedAt:desc"],
        pagination: {
          page: pageIndex + 1,
          pageSize: PAGE_SIZE,
        },
        populate: ["hashtags", "userid", "photos", "comments"],
        filters: {
          private:
            username !== loginUser?.attributes?.userid
              ? {
                  $eq: false,
                }
              : {},
          hashtags: tag
            ? {
                name: {
                  $eq: tag,
                },
              }
            : {},
          userid: username
            ? {
                userid: {
                  $eq: username,
                },
              }
            : {},
          $or: [
            {
              contents: {
                $containsi: [search],
              },
            },
            {
              title: {
                $containsi: [search],
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      },
    )
    return `${API_ENDPOINT}/posts?${query}`
  }

  const { data, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd =
    isEmpty ||
    (data &&
      data.reduce((ac, el) => ac + el.data.length, 0) ===
        data[0].meta.pagination.total)

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  useEffect(() => {
    if (!target || isReachingEnd) return
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    })
    observer.observe(target)
    return () => observer && observer.disconnect()
  }, [data, target])

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting && !isReachingEnd) {
      setSize((prev) => prev + 1)
    }
  }

  return (
    <>
      <section>
        {data
          ? data.map((loaded) => {
              return loaded.data.map((e: any, i: number) => (
                <MyCard
                  key={i}
                  mySearch={!username}
                  // img 데이터 수정하기
                  imageUrl={e.attributes.imageUrl}
                  title={e.attributes.title}
                  contents={e.attributes.contents}
                  tag={e.attributes.hashtags.data}
                  date={e.attributes.publishedAt}
                  commentLength={e.attributes.comments.data.length}
                  userid={e.attributes.userid.data.attributes.userid}
                  username={e.attributes.userid.data?.attributes.userid}
                  url={e.attributes.url}
                  isPrivate={e.attributes.private}
                />
              ))
            })
          : !isValidating && <BlankPage dataname={"포스트"} />}
      </section>
      <TargetElement ref={setTarget}>
        {isValidating && !isReachingEnd && <CardLoading />}
      </TargetElement>
    </>
  )
}

const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`
export default memo(ContentData)
