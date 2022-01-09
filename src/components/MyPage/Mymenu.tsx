import { css } from "@emotion/react"
import styled from "@emotion/styled"
import React, { useState } from "react"
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../constants"
import { Content, Series, SelfIntro } from "./Menus"

export const Mymenu: React.FC = () => {
  const [menunum, setMenunum] = useState<number>(0)

  const handleMenu = (num: number) => {
    setMenunum(num)
  }

  return (
    <section>
      <Menubar>
        <ul>
          <Menu onClick={() => handleMenu(0)} index={menunum === 0}>
            <a>글</a>
          </Menu>
          <Menu onClick={() => handleMenu(1)} index={menunum === 1}>
            <a>시리즈</a>
          </Menu>
          <Menu onClick={() => handleMenu(2)} index={menunum === 2}>
            <a>소개</a>
          </Menu>
        </ul>
      </Menubar>
      {menunum === 0 ? <Content /> : menunum === 1 ? <Series /> : <SelfIntro />}
    </section>
  )
}

const Menubar = styled.nav`
  width: 100%;
  margin: 72px auto;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    margin: 15px auto;
    box-shadow: 0 -10px 10px 0 ${PALLETS_LIGHT.MAIN_FONT};
  }
  & ul {
    display: flex;
    justify-content: center;
  }
`
type FocusNum = {
  index: boolean
}

const focus = (props: FocusNum) => css`
  color: ${props.index ? PALLETS_LIGHT.MAIN : "#000"};
  border-bottom: ${props.index ? `2px solid ${PALLETS_LIGHT.MAIN}` : "none"};
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
