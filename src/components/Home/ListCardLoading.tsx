import styled from '@emotion/styled';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '@pages/_app';
import { loaderStyle, cardBasic } from "@styles/loading-styled";
import { ThemeProps } from "@src/types/Theme"

export const ListCardLoading = () => {
  const { theme } = useContext(ThemeContext); 
  const TOP: number[] = [340, 280, 150,100,120]
  const TEXT1: number[] = [225, 450, 230,380,180]
  const TEXT2: number[] = [170, 120]
  const DESCS = [100, 160]

  return (
    <Card theme={theme}>
      <Link href={`/`} passHref>
        <a>
          <ThumbnailWrap className="thumbnail" width={100} height={100} theme={theme}>
          </ThumbnailWrap>
          <Post theme={theme}>
            <PostTitle theme={theme}>{TOP.map((e, i) => (
              <LoaderBox width={e} height={16} key={i} theme={theme} />
            ))}T</PostTitle>
            <PostContent theme={theme}>
              <TextContainer>
              {TEXT1.map((e, i) => (
                <LoaderBox width={e} height={14} key={i} theme={theme} />
              ))
              }.
              </TextContainer>
              <TextContainer>
              {TEXT2.map((e, i) => (
                <LoaderBox width={e} height={14} key={i} theme={theme} />
              ))
              }.
              </TextContainer>
            </PostContent>
            <TextContainer>
            {DESCS.map((e, i) => (
              <LoaderBox width={e} height={12} key={i} theme={theme} />
            ))
            }.
            </TextContainer>
          </Post>
        </a>
      </Link>
      <AuthorDesc theme={theme}>
          <Author theme={theme}>
            <AuthorImg
              width={24}
              height={24}
              theme={theme}
              className='img-wrap'
            />
              <LoaderBox width={100} height={12} theme={theme} />
          </Author>
      </AuthorDesc>
    </Card>
  );
};

const Card = styled.article<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.CARD_BACKGROUND};
  border-radius: 4px;
  transition: ease-in-out 0.25s;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
`;

const LoaderBox = styled.div`
  ${loaderStyle};
`
const Post = styled.section<ThemeProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const PostTitle = styled.h4<ThemeProps>`;
color:transparent;
font-size: 16px;
line-height: 1.5;
font-weight: 700;
margin-bottom: 4px;
overflow: hidden;
align-items:center;
${cardBasic}
`;

const TextContainer = styled.article`
align-items:center;
color:transparent;
${cardBasic}
`

const PostContent = styled.p<ThemeProps>`
color: ${({ theme }) => theme.SUB_FONT};
font-size: 14px;
line-height: 1.5;
margin-bottom: 24px;
height: 63px;
overflow: hidden;
display:flex;
flex-direction:column;
justify-items:center;
${cardBasic}
`;

const ThumbnailWrap= styled.section`
  position: relative;
  padding-top: 52%;
  ${loaderStyle};
  .thumbnail {
    width: 100%;
    box-sizing: border-box;
  }
`;

const AuthorDesc = styled.footer<ThemeProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.5;
  border-top: 1px solid ${({ theme }) => theme.TOGGLE_BACKGROUND};
`;

const AuthorImg = styled.div`
  display: block;
  margin-right:5px;
  ${loaderStyle};
  .img-wrap {
    border-radius: 50%;
  }
`;

const Author = styled.a<ThemeProps>`
  display: flex;
  align-items: center;
`;