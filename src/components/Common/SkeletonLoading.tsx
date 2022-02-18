import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"

export default function SkeletonLoading() {
  const { theme } = useContext(ThemeContext)
  const TOP: number[] = [235, 78, 195, 79, 167]
  const MID_TOP: number[] = [80, 120]
  const MID_BOTTOM: number[] = [64, 96, 80]
  const LAST: number[] = [
    68, 112, 45, 158, 136, 112, 90, 103, 51, 155, 77, 180, 103, 51, 115, 58,
    115, 86, 58, 202, 86, 135, 203, 101, 68, 101,
  ]

  return (
    <>
      <TopCont theme={theme}>
        {TOP.map((item, index) => (
          <li key={`${item}_${index}`} style={{ width: item }}></li>
        ))}
      </TopCont>
      <MidCont theme={theme}>
        <MidTopCont theme={theme}>
          {MID_TOP.map((item, index) => (
            <li key={`${item}_${index}`} style={{ width: item }}></li>
          ))}
        </MidTopCont>
        <MidBottomCont theme={theme}>
          {MID_BOTTOM.map((item, index) => (
            <li key={`${item}_${index}`} style={{ width: item }}></li>
          ))}
        </MidBottomCont>
      </MidCont>
      <BottomCont theme={theme}></BottomCont>
      <LastCont theme={theme}>
        <LastComp theme={theme}>
          <ul>
            {LAST.map((item, index) => (
              <li key={`${item}_${index}`} style={{ width: item }}></li>
            ))}
          </ul>
        </LastComp>
        <LastComp theme={theme}>
          <ul>
            {LAST.map((item, index) => (
              <li key={`${item}_${index}`} style={{ width: item }}></li>
            ))}
          </ul>
        </LastComp>
        <LastComp theme={theme}>
          <ul>
            {LAST.map((item, index) => (
              <li key={`${item}_${index}`} style={{ width: item }}></li>
            ))}
          </ul>
        </LastComp>
      </LastCont>
    </>
  )
}

const fade = keyframes`
  from{
    opacity : 100%;
  }
  50%{
    opacity : 30%
  }
  to{
    opacity : 100%;
  }
`

const TopCont = styled.ul<ThemeProps>`
  display: flex;
  margin-bottom: 32px;
  margin-top: 32px;
  li {
    width: 100%;
    border-radius: 5px;
    height: 60px;
    margin-right: 8px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    animation: ${fade} 2s infinite;
  }
`
const MidCont = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  li {
    height: 16px;
    border-radius: 5px;
    margin-right: 24px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    animation: ${fade} 2s infinite;
  }
`
const MidTopCont = styled.ul<ThemeProps>`
  display: flex;
  margin-bottom: 17px;
  li {
    height: 16px;
    border-radius: 3px;
    margin-right: 24px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    animation: ${fade} 2s infinite;
  }
`
const MidBottomCont = styled.ul<ThemeProps>`
  display: flex;
  margin-bottom: 39px;

  li {
    height: 32px;
    border-radius: 5px;
    margin-right: 8px;
    animation: ${fade} 2s infinite;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  }
`
const BottomCont = styled.div<ThemeProps>`
  width: 100%;
  height: 401px;
  border-radius: 5px;
  animation: ${fade} 2s infinite;
  background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  margin-bottom: 80px;
`
const LastCont = styled.div``
const LastComp = styled.div<ThemeProps>`
  display: flex;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
  }
  li {
    height: 18px;
    border-radius: 5px;
    margin-right: 8px;
    margin-bottom: 12px;
    animation: ${fade} 2s infinite;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  }
`
