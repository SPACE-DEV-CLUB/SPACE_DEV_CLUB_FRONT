import styled from "@emotion/styled"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import useSWR from "swr"
import { API_ENDPOINT } from "@src/constants"
import useIntersectionObserver from "@hooks/useIO"
import { ThemeContext } from "../../pages/_app"
import { CardProps } from "@src/types/Main"
import { ThemeProps } from "@src/types/Theme"
import { fetcher } from "@utils/fetcher"
import SkeletonLoading from "../Common/SkeletonLoading"
import { MyCard } from "../MyPage/MyCard"
import { FindPost } from "./FindPost"
import { SearchBar } from "./SearchBar"
import qs from "qs"
import Cookies from "js-cookie"
import CardLoading from "../Common/CardLoading"
import Error from "next/error"

type MapType = {
  attributes: {
    content: string
  }
}
type FilterType = {
  attributes: {
    title: string
    contents: string
  }
}
function SearchFilter() {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const res = router.query.q
  const [filteredData, setFilteredDate] = useState<CardProps[]>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [itemIndex, setItemIndex] = useState(1)
  const loginUser = JSON.parse(Cookies.get("user") || "{}")

  const query = qs.stringify({
    populate: ["userid"],
    filters: {
      private:
        loginUser.attribute &&
        router.query.username !== loginUser.attributes.userid
          ? {
              $eq: false,
            }
          : {},
      userid: router.query.username
        ? {
            userid: {
              $eq: router.query.username,
            },
          }
        : {},
      $or: [
        {
          contents: {
            $containsi: [res],
          },
        },
        {
          title: {
            $containsi: [res],
          },
        },
      ],
    },
  })
  const { data, error } = useSWR(`${API_ENDPOINT}/posts?${query}`, fetcher)

  useEffect(() => {
    if (data) {
      setFilteredDate(data.data)
    }
  }, [data])

  const timeoutFetcher = (delay = 500) =>
    new Promise((res) => setTimeout(res, delay))

  const getMoreItem = async () => {
    setIsLoaded(true)
    await timeoutFetcher()
    setItemIndex((i) => i + 1)
    setIsLoaded(false)
  }

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer,
  ) => {
    if (entry.isIntersecting && !isLoaded && filteredData?.length) {
      if (itemIndex < 3) {
        observer.unobserve(entry.target)
        await getMoreItem()
      }
    }
  }

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    onIntersect,
  })

  if (!data) return <CardLoading />
  if (error) return <Error statusCode={error.status}></Error>

  return (
    <>
      <SearchBar />
      {res && (
        <CardContainer>
          {filteredData && filteredData.length > 0 ? (
            <>
              <FindPost postNum={filteredData.length} />
              {filteredData.slice(0, itemIndex * 5).map((e, index) => (
                <MyCard
                  key={index}
                  imageUrl={e.attributes?.imageurl as any}
                  userid={e.attributes.userid.data?.attributes.userid}
                  title={e.attributes.title}
                  contents={e.attributes.contents}
                  tag={e.attributes.hashtags?.data}
                  date={e.attributes.createdAt}
                  commentLength={e.attributes.comments?.data.length}
                  username={e.attributes.userid?.data?.attributes?.userid}
                  mySearch={true}
                  isPrivate={e.attributes.private}
                  profileImg={e.attributes.userid.data?.attributes.profileimage}
                  url={e.attributes?.url}
                />
              ))}
            </>
          ) : (
            <NoResult theme={theme}>검색 결과가 없습니다</NoResult>
          )}
          <div ref={setTarget}>{isLoaded && <SkeletonLoading />}</div>
        </CardContainer>
      )}
    </>
  )
}

export default SearchFilter

const CardContainer = styled.div``

const NoResult = styled.div<ThemeProps>`
  padding-top: 18px;
  font-size: 18px;
  color: ${({ theme }) => theme.SUB_FONT};
`
