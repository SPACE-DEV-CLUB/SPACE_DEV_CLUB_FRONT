import styled from "@emotion/styled"
import Link from "next/link"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"

interface TagProps {
  tagName: string
}

export const Tag = ({ tagName }: TagProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <TagsContainer theme={theme}>
      <Link href={`/tags/${tagName}`}>
        <a>{tagName}</a>
      </Link>
    </TagsContainer>
  )
}

const TagsContainer = styled.div<ThemeProps>`
  display: inline-flex;
  align-items: center;
  margin: 0 14px 14px 0;
  padding: 0 16px;
  height: 32px;
  font-weight: 500;
  background: ${({ theme }) => theme.SUBBACKGROUND};
  border-radius: 15px;
  a {
    font-size: 16px;
    color: ${({ theme }) => theme.MAIN};
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    a {
      font-size: 12px;
    }
  }
`
