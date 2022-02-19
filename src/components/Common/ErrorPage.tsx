import styled from "@emotion/styled"
import Link from "next/link"

import { Theme } from "@styles/theme"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"

interface ThemeProps {
  theme: Theme
}

export const ErrorPage = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Container>
      <h2 className="sr-only">상세 404페이지</h2>
      <article>
        <Img
          src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569_960_720.jpg"
          alt="404사진"
        />
        <H3>아무것도 없네요!</H3>

        <Link href="/">
          <Home theme={theme}>홈으로</Home>
        </Link>
      </article>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
`
const Img = styled.img`
  width: 50%;
`
const H3 = styled.h3`
  font-size: 40px;
  margin: 40px 0;
`
const Home = styled.p<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  padding: 0px 18px;
  height: 40px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.MAIN};
  color: ${({ theme }) => theme.BACKGROUND};
`
