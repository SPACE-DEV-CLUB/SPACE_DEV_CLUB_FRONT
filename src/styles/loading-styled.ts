import { css, keyframes } from "@emotion/react"
import { Theme } from "./theme"

export const fade = keyframes`
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

interface LoaderBoxProps {
  width: number
  height: number
  theme: Theme
}

export const loaderStyle = ({ width, height, theme }: LoaderBoxProps) => css`
  width: ${width}px;
  height: ${height}px;
  background: ${theme.TOGGLE_BACKGROUND};
  animation : ${fade} 3s infinite;
  border-radius : 5px;
}
`

export const cardBasic = () => css`
  display: flex;
  div + div {
    margin-left: 10px;
  }
`
