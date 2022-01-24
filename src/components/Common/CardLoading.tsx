import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"

const CardLoading = () => {
  const { theme } = useContext(ThemeContext)
  const tags = [100, 200]
  return (
    <MyCardContainer theme={theme}>
      <ImageContainer />

      <h2></h2>
      <p></p>
      <DateCommentContainer theme={theme}></DateCommentContainer>
    </MyCardContainer>
  )
}

const MyCardContainer = styled.section<ThemeProps>`
width: 100%;
max-width: 768px;
padding-bottom: 64px;
& + & {
padding: 64px 0;
}
h2 {
font-size: 24px;
margin-top: 20px;
color: ${({ theme }) => theme.MAIN_FONT};
}
}

@media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
padding: 32px 0;
h2 {
  font-size: 16px;
}
p {
  font-size: 14px;
}
.date-comment-wrap {
  font-size: 12px;
}
}
`

const DateCommentContainer = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  font-size: 14px;
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 12px;
  }
`

const ImageContainer = styled.div`
  width: 743px;
  height: 402px;
  background: black;
`

const ProfileContainer = styled.section<ThemeProps>`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  vertical-align: center;
  .img-wrap {
    width: 48px;
    height: 48px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.MAIN_FONT};
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    .img-wrap {
      width: 32px;
      height: 32px;
    }
  }
`

export default CardLoading
