import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { cardBasic, fade, loaderStyle } from "../../styles/loading-styled"
import { ThemeProps } from "../../types/Theme"
import CardLoading from "../Common/CardLoading"
import { Header } from "../Common/Header"

const TagLoading = () => {
  const { theme } = useContext(ThemeContext)
  const TEXT1: number[] = [300, 195, 500, 320, 87, 175]
  return (
    <>
      <Header user={false} />
      <TagSection>
        <Main>
          <TagInfo>
            <TagImg theme={theme} />
            <TagName width={300} height={48} theme={theme}></TagName>
            <TagDesc>
              {TEXT1.map((e, i) => (
                <LoaderBox key={i} width={e} height={24} theme={theme} />
              ))}
            </TagDesc>
            <TagDesc>
              {TEXT1.map((e, i) => (
                <LoaderBox key={i} width={e + 200} height={24} theme={theme} />
              ))}
            </TagDesc>
            <TagBox theme={theme} />
          </TagInfo>
          <CardContainer>
            <CardLoading />
            <CardLoading />
          </CardContainer>
        </Main>
      </TagSection>
    </>
  )
}

const TagSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Main = styled.main`
  width: 768px;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
`
const LoaderBox = styled.div`
  ${loaderStyle}
`
const TagInfo = styled.article`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 64px;
`
const TagImg = styled.div<ThemeProps>`
  width: 192px;
  height: 192px;
  margin-bottom: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  animation: ${fade} 3s infinite;

  @media screen and(max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 128px;
    height: 128px;
    margin: 32px 0 16px;
  }
`
const TagName = styled.div`
  ${loaderStyle};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    height: 32px;
  }
`

const TagDesc = styled.div`
  ${cardBasic};
  padding-top: 16px;
`

const CardContainer = styled.article``

const TagBox = styled.div<ThemeProps>`
  width: 200px;
  height: 14px;
  border-radius: 5px;
  margin-top: 16px;
  background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  animation: ${fade} 3s infinite;
`

export default TagLoading
