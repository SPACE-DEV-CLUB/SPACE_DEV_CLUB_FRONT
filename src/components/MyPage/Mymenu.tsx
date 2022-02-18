import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Link from "next/link"
import React, { useState } from "react"
import { MEDIA_QUERY_END_POINT } from "@constants/index"
import { Theme } from "@styles/theme"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"

interface MymenuProps {
  username: string | string[] | undefined
  indexnum: number
}
export const Mymenu = ({ username, indexnum }: MymenuProps): JSX.Element => {
  const { theme } = useContext(ThemeContext)
  return (
    <section>
      <Menubar theme={theme}>
        <ul>
          <Menu theme={theme} index={indexnum === 0}>
            <Link href={`/${username}`} passHref>
              <a>글</a>
            </Link>
          </Menu>
          <Menu theme={theme} index={indexnum === 1}>
            <Link href={`/${username}/series`} passHref>
              <a>시리즈</a>
            </Link>
          </Menu>
          <Menu theme={theme} index={indexnum === 2}>
            <Link href={`/${username}/about`} passHref>
              <a>소개</a>
            </Link>
          </Menu>
        </ul>
      </Menubar>
    </section>
  )
}

const Menubar = styled.nav<ThemeProps>`
  width: 100%;
  margin: 72px auto;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    margin: 15px auto;
    box-shadow: 0 -10px 10px 0 ${({ theme }) => theme.SUBBACKGROUND};
  }
  & ul {
    display: flex;
    justify-content: center;
  }
`
type FocusNum = {
  index: boolean
  theme: Theme
}

const focus = (props: FocusNum) => css`
  color: ${props.index ? props.theme.MAIN : props.theme.MAIN_FONT};
  border-bottom: ${props.index ? `2px solid ${props.theme.MAIN}` : "none"};
`

const Menu = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 48px;
  font-size: 21px;
  ${focus}
  a {
    color: inherit;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
  }
`
