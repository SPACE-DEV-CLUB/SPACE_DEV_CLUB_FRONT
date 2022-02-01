import styled from "@emotion/styled"
import Image from "next/image"
import Link from "next/link"
import { Lock } from "@mui/icons-material"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { useContext, useState } from "react"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"
import { Profile } from "."
import { Tag } from "../Common/Tag"

type PropsTypes = {
  imageUrl: string
  title: string
  contents: string
  tag?: Array<string> | undefined | null
  date: string
  //   comment: number
  username: string | string[] | undefined
  mySearch?: boolean
  count?: number
  day?: number
}
export const MyCard = ({
  imageUrl,
  title,
  contents,
  tag,
  date,
  //   comment,
  mySearch,
  username,
  count,
  day,
}: PropsTypes) => {
  const { theme } = useContext(ThemeContext)
  const [isPrivate, setPrivate] = useState(false)
  return (
    <MyCardContainer theme={theme}>
      {mySearch && <Profile id={username}></Profile>}
      <Link href={`/${username}`} passHref>
        <a>
          <ImageContainer
            layout="responsive"
            width={734}
            height={402}
            alt="sample image"
            src={imageUrl ? imageUrl : "/image/sample.jpeg"}
          />
          <h2>{title}</h2>
        </a>
      </Link>
      <p>{contents}</p>
      {tag?.map((e, index) => (
        <Tag tagName={e} key={index} />
      ))}
      <DateCommentContainer theme={theme}>
        <span>{date}일 전</span>
        <span> · </span>
        <span>{2}개의 댓글</span>
        <span> · </span>
        {!isPrivate && (
          <Private theme={theme}>
            <Lock className="lock-icon" fontSize="small" />
            비공개
          </Private>
        )}
      </DateCommentContainer>
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
  margin-top: 5px;
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 12px;
  }
`

const ImageContainer = styled(Image)`
  background: pink;
  overflow: hidden;
  object-fit: cover;
`

const Private = styled.div<ThemeProps>`
  background: ${({ theme }) => theme.SUB_FONT};
  color: ${({ theme }) => theme.BACKGROUND};
  border-radius: 3px;
  padding: 3px 7px;
  display: inline;
  .lock-icon {
    vertical-align: bottom;
    font-size: 15px;
    margin-right: 5px;
  }
`
