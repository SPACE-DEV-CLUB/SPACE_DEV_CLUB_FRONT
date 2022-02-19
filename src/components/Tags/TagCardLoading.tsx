import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "@src/constants"
import { ThemeContext } from "@src/pages/_app"
import { cardBasic, fade, loaderStyle } from "@src/styles/loading-styled"
import { ThemeProps } from "@src/types/Theme"

const TagCardLoading = () => {
  const { theme } = useContext(ThemeContext)
  const TEXT1: number[] = [51, 78, 102, 42, 63, 23, 40, 60, 100]

  return (
    <TagWrapper>
      <div>
        <Tag theme={theme} />
        <Loaders>
          {TEXT1.map((e, i) => (
            <LoaderBox width={e} height={18} key={i} theme={theme} />
          ))}
        </Loaders>
      </div>
      <TagCount width={200} height={16} theme={theme}></TagCount>
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
    width: 100%;
  }
`

const Tag = styled.div<ThemeProps>`
  width: 80px;
  height: 30px;
  background: ${({ theme }) => theme.SUBBACKGROUND};
  border-radius: 30px;
  animation: ${fade} 3s infinite;
`

const TagCount = styled.div`
  ${loaderStyle};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    height: 12px;
  }
`

const Loaders = styled.article`
  ${cardBasic};
  width: 100%;
  height: 80%;
  margin: 10px 0;
  flex-wrap: wrap;
`
const LoaderBox = styled.div`
  ${loaderStyle};
`
export default TagCardLoading
