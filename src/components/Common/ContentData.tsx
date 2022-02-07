import { MyCard } from "../MyPage/MyCard"
import CardLoading from "./CardLoading"
import { fetcher } from "../../utils/fetcher"
import useSWRInfinite from "swr/infinite"
import { API_ENDPOINT } from "../../constants"
import { useEffect, useRef, useState, memo } from "react"
import styled from "@emotion/styled"
import qs from "qs"
import BlankPage from "../MyPage/Menus/BlankPage"

const PAGE_SIZE = 2

interface ContentDataProps {
    username?: string | string[] | undefined
    tag: string
}

const ContentData = ({ tag, username = undefined }: ContentDataProps) => {
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data) return null
        const query = qs.stringify(
            {
                sort: ["publishedAt:desc"],
                pagination: {
                    page: pageIndex,
                    pageSize: PAGE_SIZE,
                },
                populate: ["hashtags", "userid"],
                filters: {
                    hashtags: tag
                        ? {
                              name: {
                                  $eq: tag,
                              },
                          }
                        : {},
                    userid: username
                        ? {
                              nickname: {
                                  $eq: username,
                              },
                          }
                        : {},
                },
            },
            {
                encodeValuesOnly: true,
            }
        )
        return `${API_ENDPOINT}/posts?${query}`
    }

    const { data, size, setSize, error, isValidating } = useSWRInfinite(
        getKey,
        fetcher
    )

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
                    : isEmpty ||
                      (data && data[data.length - 1]?.data.length < PAGE_SIZE)
        }
    }

    return (
        <>
            <section>
                {!isEmpty && data
                    ? data
                          .filter((e, i) => {
                              if (size == 1) return true
                              else {
                                  return i !== 0
                              }
                          })
                          .map((loaded) => {
                              return loaded.data.map((e: any, i: number) => (
                                  <MyCard
                                      key={i}
                                      mySearch={!username}
                                      imageUrl={e.attributes.imageUrl}
                                      title={e.attributes.title}
                                      contents={e.attributes.contents}
                                      tag={e.attributes.hashtags.data}
                                      date={e.attributes.publichedAt}
                                      // comment={e.attributes.comment}
                                      username={
                                          e.attributes.userid.data?.attributes
                                              .nickname
                                      }
                                  />
                              ))
                          })
                    : !isValidating && <BlankPage dataname={"포스트"} />}
            </section>
            <TargetElement ref={setTarget}>
                {isValidating && !isReachingEnd.current && <CardLoading />}
            </TargetElement>
        </>
    )
}

const TargetElement = styled.article`
    width: 100%;
    height: 100px;
`
export default memo(ContentData)
