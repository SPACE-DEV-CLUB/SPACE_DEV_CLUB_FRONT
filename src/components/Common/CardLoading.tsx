import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "@constants/index"
import { ThemeContext } from "@pages/_app"
import { loaderStyle, cardBasic } from "@styles/loading-styled"
import { ThemeProps } from "@src/types/Theme"

const CardLoading = () => {
  const { theme } = useContext(ThemeContext)
  const TOP: number[] = [200, 80, 195, 80, 175]
  const TEXT1: number[] = [300, 195, 500, 320, 87, 175]
  const TEXT2: number[] = [200, 95, 350, 520, 80, 305]
  const TAGS = [100, 200]
  return (
    <MyCardContainer theme={theme}>
      <ProfileContainer theme={theme}>
        <LoaderBox className="img-wrap" width={48} height={48} theme={theme} />
        <LoaderBox width={100} height={20} theme={theme} />
      </ProfileContainer>
      <LoaderBox className="thumbnail" width={768} height={402} theme={theme} />
      <TitleContainer>
        {TOP.map((e, i) => (
          <LoaderBox width={e} height={28} key={i} theme={theme} />
        ))}
      </TitleContainer>
      <TextContainer>
        {TEXT1.map((e, i) => (
          <LoaderBox width={e / 2} height={20} key={i} theme={theme} />
        ))}
      </TextContainer>
      <TextContainer>
        {TEXT2.map((e, i) => (
          <LoaderBox width={e / 2} height={20} key={i} theme={theme} />
        ))}
      </TextContainer>
      <DetailContainer>
        {TAGS.map((e, i) => (
          <LoaderBox width={e} height={40} key={i} theme={theme} />
        ))}
      </DetailContainer>
      <DetailContainer>
        {TAGS.map((e, i) => (
          <LoaderBox width={e / 2} height={16} key={i} theme={theme} />
        ))}
      </DetailContainer>
    </MyCardContainer>
  )
}

const MyCardContainer = styled.section<ThemeProps>`
  max-width: 768px;
  padding-bottom: 64px;
  & + & {
    padding: 64px 0;
  }

  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 32px 0;
    .thumbnail {
      width: 100%;
      box-sizing: border-box;
    }
  }
`

const LoaderBox = styled.div`
  ${loaderStyle};
`

const ProfileContainer = styled.section<ThemeProps>`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  vertical-align: center;
  .img-wrap {
    border-radius: 50%;
    margin-right: 16px;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    .img-wrap {
      width: 32px;
      height: 32px;
    }
  }
`

const TitleContainer = styled.article`
  padding: 20px 0;
  ${cardBasic}
`

const TextContainer = styled.article`
  padding: 5px 0;
  ${cardBasic}
`

const DetailContainer = styled.article`
  margin: 20px 0;
  ${cardBasic}
`

export default CardLoading
