import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { MEDIA_QUERY_END_POINT } from "@constants/index"
import SearchIcon from "@mui/icons-material/Search"
import { ChangeEvent, useContext, useRef, useState } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"
import ContentData from "../../Common/ContentData"
import { useData } from "@hooks/useData"
import qs from "qs"
import { Theme } from "@styles/theme"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

interface ContentProps {
  username: string | string[] | undefined
}

export const Content = ({ username }: ContentProps) => {
  const { theme } = useContext(ThemeContext)
  const tagchecker = useRef("")
  const tagData = useRef([])
  const [tag, setTag] = useState("")
  const [search, setSearch] = useState("")
  const loginUser = JSON.parse(Cookies.get("user") || "{}")
  const router = useRouter()
  const id = router.query.id

  const query = qs.stringify(
    {
      populate: {
        posts: {
          populate: ["user"],
        },
      },
      filters: {
        posts: {
          userid: {
            userid: {
              $eq: id,
            },
          },
          private:
            username !== loginUser?.attributes?.userid
              ? {
                  $eq: false,
                }
              : {},
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const { data, isValidating } = useData("hashtags", query)

  if (!data) return <></>

  if (!isValidating) {
    tagData.current = data.data.filter((e: any) =>
      e.attributes.posts.data.some(
        (post: any) =>
          post.attributes.userid.data?.attributes.userid === username,
      ),
    )
  }

  const handleTag = (tagName: string) => {
    setTag(tagName)
    tagchecker.current = tagName
  }

  return (
    <ContentContainer>
      <SearchContainer theme={theme}>
        <article className="searchBox">
          <SearchIcon />
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="검색어를 입력하세요."
          />
        </article>
      </SearchContainer>
      <SmallTaglist theme={theme}>
        <ul>
          <SmallTagBtn
            onClick={() => handleTag("")}
            check={tagchecker.current === ""}
            theme={theme}
          >
            <a>
              전체보기<span>({data.meta.pagination.total})</span>
            </a>
          </SmallTagBtn>
          {tagData.current.map((tag: any) => {
            return (
              <SmallTagBtn
                key={tag.attributes.id}
                onClick={() => handleTag(tag.attributes.name)}
                check={tag.attributes.name === tagchecker.current}
                theme={theme}
              >
                <a>
                  {tag.attributes.name}
                  <span>
                    (
                    {
                      tag.attributes.posts.data.filter(
                        (e: any) =>
                          e.attributes.userid.data?.attributes.userid ===
                          username,
                      ).length
                    }
                    )
                  </span>
                </a>
              </SmallTagBtn>
            )
          })}
        </ul>
      </SmallTaglist>
      <LargeTaglist theme={theme}>
        <h1>태그 목록</h1>
        <ul>
          <LargeTagBtn
            onClick={() => handleTag("")}
            check={tagchecker.current === ""}
            theme={theme}
          >
            <LargeTagName>전체보기</LargeTagName>
            <LargeTagCount theme={theme}>
              ({data.meta.pagination.total})
            </LargeTagCount>
          </LargeTagBtn>
          {tagData.current.map((tag: any) => {
            return (
              <LargeTagBtn
                key={tag.attributes.id}
                onClick={() => handleTag(tag.attributes.name)}
                check={tag.attributes.name === tagchecker.current}
                theme={theme}
              >
                <LargeTagName>{tag.attributes.name}</LargeTagName>
                <LargeTagCount theme={theme}>
                  (
                  {
                    tag.attributes.posts.data.filter(
                      (e: any) =>
                        e.attributes.userid.data?.attributes.userid ===
                        username,
                    ).length
                  }
                  )
                </LargeTagCount>
              </LargeTagBtn>
            )
          })}
        </ul>
      </LargeTaglist>
      <ContentData
        username={username}
        tag={tagchecker.current}
        search={search}
      />
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
    border-bottom: 1px solid ${({ theme }) => theme.SUB_FONT};
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
    li + li {
      margin-left: 8px;
    }
  }
`

interface TagBtnProps {
  check: boolean
  theme: Theme
}

const largeBtnStyle = (props: TagBtnProps) => css`
  color: ${props.check ? props.theme.MAIN : props.theme.MAIN_FONT};
`

const LargeTagBtn = styled.li`
  ${largeBtnStyle};
  & {
    padding-top: 8px;
  }
`

const LargeTagName = styled.a`
  color: inherit;
  &:hover {
    text-decoration: underline;
  }
`

const LargeTagCount = styled.span<ThemeProps>`
  margin-left: 10px;
  color: ${({ theme }) => theme.POINT_FONT};
`

const tagBtnStyle = (props: TagBtnProps) => css`
  background: ${props.check ? props.theme.MAIN : props.theme.SUBBACKGROUND};
  color: ${props.check ? props.theme.BACKGROUND : props.theme.SUB_FONT};
  a {
    line-height: 24px;
    color: ${props.check ? props.theme.BACKGROUND : props.theme.MAIN_FONT};
  }
  span {
    color: ${props.check ? props.theme.SUBBACKGROUND : props.theme.SUB_FONT};
    margin-left: 5px;
  }
`

const SmallTagBtn = styled.li`
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
  ${tagBtnStyle}
`
