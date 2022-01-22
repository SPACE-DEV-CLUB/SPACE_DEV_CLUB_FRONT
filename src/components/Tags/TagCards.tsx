import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { TagsProps } from "../../types/Main"
import { ThemeProps } from "../../types/Theme"
import { Tag } from "../Common/Tag"

const TagCards = ({ tagName, tagDesc, tagCount }: TagsProps) => {
  const { theme } = useContext(ThemeContext)
  return (
    <TagWrapper>
      <div>
        <Tag tagName={tagName} />
        <TagDesc theme={theme}>{tagDesc}</TagDesc>
      </div>
      <TagCount theme={theme}>총 {tagCount}개의 포스트</TagCount>
    </TagWrapper>
  )
}

const TagWrapper = styled.div`
  display: flex;
  height: 192px;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px;
  box-sizing: border-box;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    margin-bottom: 32px;
  }
`

const TagDesc = styled.p<ThemeProps>`
  margin: 2px 0 12px;
  width: 100%;
  line-height: 1.5;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-break: anywhere;
  font-size: 14px;
  color: ${({ theme }) => theme.SUB_FONT};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 12px;
  }
`

const TagCount = styled.div<ThemeProps>`
  font-size: 14px;
  color: ${({ theme }) => theme.POINT_FONT};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 12px;
  }
`
export default TagCards
