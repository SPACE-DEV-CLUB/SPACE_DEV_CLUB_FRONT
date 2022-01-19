import styled from "@emotion/styled"
import Search from "@mui/icons-material/Search"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { Theme } from "../../styles/theme"
import { useContext } from "react"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"

export const SearchBar = () => {
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [inputRef])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      router.push({ query: { q: searchQuery } })
    }, 300)
    return () => clearTimeout(timeOut)
  }, [searchQuery])

  return (
    <BarContainer theme={theme}>
      <form>
        <div className="img-wrap">
          <Search />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={queryHandler}
          placeholder="검색어를 입력하세요"
        ></input>
      </form>
    </BarContainer>
  )
}

const BarContainer = styled.div<ThemeProps>`
  width: 734px;
  margin: 0 auto;
  form {
    position: relative;
    display: flex;
    align-items: center;
    height: 64px;
    .img-wrap {
      position: absolute;
      left: 24px;
    }
    input {
      width: 100%;
      margin-left: 0px;
      height: 32px;
      border: 1px solid ${({ theme }) => theme.BORDER};
      font-size: 24px;
      padding: 10px 64px;
      color: ${({ theme }) => theme.MAIN_FONT};
      background: ${({ theme }) => theme.SUBBACKGROUND};
      outline: none;
      transition: outline-color 1000ms;

      &:active,
      &:focus {
        outline: 1px solid ${({ theme }) => theme.MAIN};
      }
      &::placeholder {
        color: ${({ theme }) => theme.BORDER};
      }
    }
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    margin-bottom: 24px;
    width: 100%;
    form {
      display: flex;
      align-items: center;
      height: 34px;
      input {
        height: 16px;
        font-size: 18px;
        vertical-align: center;
      }
    }
  }
`
