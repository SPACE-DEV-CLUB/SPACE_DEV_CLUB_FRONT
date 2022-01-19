import styled from "@emotion/styled"
import Image from "next/image"
import Link from "next/link"
import { MEDIA_QUERY_END_POINT } from "../../../constants"
import { useRouter } from "next/router"
import { useContext } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"

export const SeriesCard = ({
  imageUrl,
  postTitle,
  count,
  updateDate,
  username,
}: {
  imageUrl: string
  postTitle: string
  count?: number
  updateDate: number
  username: string | string[] | undefined
}) => {
  const router = useRouter()
  const { theme } = useContext(ThemeContext)
  return (
    <Container theme={theme}>
      <Link href={`/${username}/series/${postTitle}`}>
        <a>
          <ImageContainer
            layout="responsive"
            width={732}
            height={402}
            alt="sample image"
            src={imageUrl}
          />
          <h2>{postTitle}</h2>
        </a>
      </Link>
      <DateCommentContainer theme={theme}>
        <span>{count}개의 포스트</span>
        <span> · </span>
        <span>마지막 업데이트 {updateDate}</span>
      </DateCommentContainer>
    </Container>
  )
}
const Container = styled.section<ThemeProps>`
  max-width: 768px;
  padding: 48px 16px 0;
  h2 {
    font-size: 24px;
    margin: 20px 0;
    color: ${({ theme }) => theme.MAIN_FONT};
  }
  p {
    color: ${({ theme }) => theme.SUB_FONT};
    font-size: 16px;
    line-height: 25px;
    margin: 8px 0 32px 0;
    /* 3줄 말줄임 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 3;
    height: 70px;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 32px 16px;
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 14px;
    }
  }
`

const ImageContainer = styled(Image)`
  background: pink;
  overflow: hidden;
  object-fit: cover;
`

const DateCommentContainer = styled.div<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  font-size: 14px;
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 12px;
  }
`
