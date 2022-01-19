import styled from "@emotion/styled"
import Image from "next/image"
import Link from "next/link"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { useContext } from "react"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"
import { Profile } from "."

type PropsTypes = {
  imageUrl: string
  postTitle: string
  postDesc: string
  tags?: Array<string>
  date: number
  comment: number
  username: string | string[] | undefined
  mySearch?: boolean
  count?: number
  day?: number
}
export const MyCard = ({
  imageUrl,
  postTitle,
  postDesc,
  tags,
  date,
  comment,
  mySearch,
  username,
  count,
  day,
}: PropsTypes) => {
  const { theme } = useContext(ThemeContext)
  return (
    <MyCardContainer theme={theme}>
      {!mySearch ? (
        <>
          <Link href={`/${username}`} passHref>
            <a>
              <ImageContainer
                layout="responsive"
                width={734}
                height={402}
                alt="sample image"
                src={imageUrl ? imageUrl : "/image/sample.jpeg"}
              />

              <h2>{postTitle}</h2>
            </a>
          </Link>
          <p>{postDesc}</p>
          {tags?.map((e, index) => (
            <TagsContainer theme={theme} key={index}>
              <Link href={`/tags/${e}`}>
                <a>{e}</a>
              </Link>
            </TagsContainer>
          ))}
          <DateCommentContainer theme={theme}>
            <span>{date}일 전</span>
            <span> · </span>
            <span>{comment}개의 댓글</span>
          </DateCommentContainer>
        </>
      ) : (
        <>
          <Profile id={username}></Profile>
          <Link href={`/${username}`} passHref>
            <a>
              <ImageContainer
                src={imageUrl ? imageUrl : "/image/sample.jpeg"}
                layout="responsive"
                width={734}
                height={402}
                alt="sample image"
              />
              <h2>{postTitle}</h2>
            </a>
          </Link>
          <p>{postDesc}</p>
          <DateCommentContainer theme={theme}>
            <span>{date}일 전</span>
            <span> · </span>
            <span>{comment}개의 댓글</span>
          </DateCommentContainer>
        </>
      )}
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
  /* .series-title {
        margin-bottom: 13px;
        font-size: 16px;
    }
    .series-info-wrap {
        color: #868e96;
        font-size: 14px;
    }
    .series-count {
        color: #495057;
    } */
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

const ImageContainer = styled(Image)`
  background: pink;
  overflow: hidden;
  object-fit: cover;
`

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
