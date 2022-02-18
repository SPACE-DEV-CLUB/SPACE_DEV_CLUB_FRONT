import React from "react"
import styled from "@emotion/styled"
import Image from "next/image"
import { MEDIA_QUERY_END_POINT } from "@constants/index"
import { css } from "@emotion/react"
import { DetailCardProps } from "@src/types/Main"
import { Theme } from "@styles/theme"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"

const DetailCard = ({
  margin = "0",
  padding = "0",
  opacity = false,
  ...props
}: DetailCardProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      {/* 마이페이지 글 카드, 서치카드 공유, 시리즈 카드 하나, 시리즈 디테일 하나. */}
      <Container
        theme={theme}
        margin={margin}
        padding={padding}
        opacity={opacity}
      >
        <h2>
          <span>{props.postIdx}. </span>
          {props.postTitle}
        </h2>
        <DetailContainer>
          <ImageContainer>
            <Image
              className="main-image"
              alt="sample image"
              width={192}
              height={100}
              layout="responsive"
              src={props.imageUrl || "/image/sample.jpeg"}
            ></Image>
          </ImageContainer>
          <DescContainer theme={theme}>
            <p className="desc">{props.postDesc}</p>
            <p className="date">{props.date}</p>
          </DescContainer>
        </DetailContainer>
      </Container>
    </>
  )
}

export default DetailCard

interface Containerprops {
  margin: string
  padding: string
  opacity: boolean
  theme: Theme
}

const containerstyle = (props: Containerprops) => css`
  margin: ${props.margin};
  padding: ${props.padding};
  opacity: ${props.opacity ? "70%" : "100%"};
`

const Container = styled.div`
  ${containerstyle}
  background : ${({ theme }) => theme.CARD_BACKGROUND};
  border-radius: 4px;
  span {
    color: ${({ theme }) => theme.BORDER};
    font-style: italic;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 21px;
    line-height: 1.5;
    color: ${({ theme }) => theme.SUB_FONT};
  }
`

const DetailContainer = styled.div`
  display: flex;
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    display: block;
  }
`

const ImageContainer = styled.div`
  width: 192px;
  height: 100px;
  overflow: hidden;
  .main-image {
    object-fit: cover;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    height: auto;
  }
`

const DescContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px;
  width: 80%;
  > .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 24px;
    color: ${({ theme }) => theme.SUB_FONT};
  }
  > .date {
    color: ${({ theme }) => theme.BORDER};
    font-size: 14px;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    margin: 0;
    > .date {
      margin-top: 16px;
    }
  }
`
