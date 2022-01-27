import styled from "@emotion/styled"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "../../../constants"
import SearchIcon from "@mui/icons-material/Search"
import { MyCard } from "../MyCard"
import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"
import CardLoading from "../../Common/CardLoading"
import { fetcher } from "../../../utils/fetcher"
import useSWRInfinite from "swr/infinite"

interface ContentProps {
  username: string | string[] | undefined
}
const PAGE_SIZE = 2
export const Content = ({ username }: ContentProps) => {
  const { theme } = useContext(ThemeContext)

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null
    return `${API_ENDPOINT}/posts?pagination[page]=${pageIndex}&pagination[pageSize]=${PAGE_SIZE}`
  }

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined")

  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd) {
      setSize((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (!target) return
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    })
    observer.observe(target)
    return () => observer && observer.disconnect()
  }, [target])

  return (
    <ContentContainer>
      <SearchContainer theme={theme}>
        <article className="searchBox">
          <SearchIcon />
          <input type="text" placeholder="검색어를 입력하세요." />
        </article>
      </SearchContainer>
      <SmallTaglist theme={theme}>
        <ul>
          <li>
            <a>
              전체보기<span>(50)</span>
            </a>
          </li>
          {/* 태그 데이터 받아서 추가 */}
        </ul>
      </SmallTaglist>
      <LargeTaglist theme={theme}>
        <h1>태그 목록</h1>
        <ul>
          <li>
            <a>전체보기</a>
            <span>(50)</span>
          </li>
          {/* 태그 데이터 받아서 추가 */}
        </ul>
      </LargeTaglist>
      <section>
        {data &&
          data
            .filter((e, i) => i != 0)
            .map((loaded) => {
              return loaded.data.map((e: any, i: number) => (
                <MyCard
                  key={i}
                  imageUrl={e.attributes.imageUrl}
                  title={e.attributes.title}
                  contents={e.attributes.contents}
                  tag={e.attributes.tag?.tags}
                  date={e.attributes.publichedAt}
                  // comment={e.attributes.comment}
                  username={username}
                />
              ))
            })}
      </section>
      <TargetElement ref={setTarget}>
        {isLoadingMore && <CardLoading />}
      </TargetElement>
    </ContentContainer>
  )
}

const ContentContainer = styled.section`
  position: relative;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0 16px;
  }
`

const SearchContainer = styled.article<ThemeProps>`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
  .searchBox {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.MAIN_FONT};
    cursor: text;
    input {
      margin-left: 8px;
      border: none;
      outline: none;
      font-size: 14px;
      background: ${({ theme }) => theme.BACKGROUND};
      color: ${({ theme }) => theme.MAIN_FONT};
    }
  }
`
const LargeTaglist = styled.section<ThemeProps>`
  display: block;
  position: absolute;
  top: 58px;
  left: -250px;
  width: 200px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    display: none;
  }
  h1 {
    width: 100%;
    line-height: 24px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.BACKGROUND};
  }
  li a {
    margin-right: 5px;
    color: ${({ theme }) => theme.MAIN_FONT};
    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.MAIN};
    }

    &:active {
      color: ${({ theme }) => theme.MAIN};
    }
  }
`

const SmallTaglist = styled.section<ThemeProps>`
  display: none;
  width: 100%;
  padding: 16px 0;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0;
    padding-bottom: 16px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    display: block;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
      padding: 0;
    }
    li {
      display: flex;
      justify-content: center;
      flex-shrink: 0;
      align-items: center;
      padding: 0 14px;
      height: 24px;
      line-height: 1.5;
      background: ${({ theme }) => theme.SUBBACKGROUND};
      color: ${({ theme }) => theme.SUB_FONT};
      font-size: 12px;
      border-radius: 12px;
      &:active,
      &:active * {
        font-size: 12px;
        background: ${({ theme }) => theme.MAIN};
        color: ${({ theme }) => theme.BACKGROUND};
      }
      a {
        line-height: 24px;
        color: ${({ theme }) => theme.MAIN_FONT};
      }
      span {
        color: ${({ theme }) => theme.SUB_FONT};
        margin-left: 5px;
      }
    }
    li + li {
      margin-left: 8px;
    }
  }
`
const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`
