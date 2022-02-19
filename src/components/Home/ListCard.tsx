import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SAMPLE_IMG from '../../../public/image/sampleUser2.jpg';
import { Theme } from '@styles/theme';
import { ThemeContext } from '@pages/_app';
import { handleDate } from '@utils/date';
interface ThemeProps {
  theme: Theme;
}

export const ListCard = ({
  imageUrl,
  title,
  contents,
  comments,
  username,
  count,
  thumbnail,
  publishedAt,
}: {
  imageUrl?: string;
  title: string;
  contents: string;
  comments?: number;
  username?: string | string[] | undefined;
  count?: number;
  thumbnail?: string;
  publishedAt: string;
}) => {
  const { theme } = useContext(ThemeContext);

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/image/post_thumbnail.png';
  };

  return (
    <Card theme={theme}>
      <Link href={`/@${username}`} passHref>
        <a>
          <ThumbnailWrap>
            <Thumbnail src={''} alt="" onError={handleImageError}/>
          </ThumbnailWrap>
          <Post theme={theme}>
            <PostTitle theme={theme}>{title}</PostTitle>
            <PostContent theme={theme}>{contents}</PostContent>
            <div>
              <PostDesc theme={theme}>{handleDate(publishedAt)}</PostDesc>
              <Dot>&#183;</Dot>
              <PostDesc theme={theme}>{comments || 0}개의 댓글</PostDesc>
            </div>
          </Post>
        </a>
      </Link>
      <AuthorDesc theme={theme}>
        <Link href="/" passHref>
          <Author theme={theme}>
            <AuthorImg
              src={SAMPLE_IMG}
              alt=""
              width={24}
              height={24}
            ></AuthorImg>
            <Preposition theme={theme}>
              by
              <AuthorName theme={theme}> {username}</AuthorName>
            </Preposition>
          </Author>
        </Link>
        <Like theme={theme}>
          <FavoriteIcon />
          <span>{count}</span>
        </Like>
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
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(0 0 0 / 0.3) 0px 4px 16px 0px;
  }
`;

const Post = styled.section<ThemeProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const PostTitle = styled.h4<ThemeProps>`
color: ${({ theme }) => theme.MAIN_FONT};
font-size: 16px;
line-height: 1.5;
font-weight: 700;
margin-bottom: 4px;
word-break: break-word;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
`;

const PostContent = styled.p<ThemeProps>`
color: ${({ theme }) => theme.SUB_FONT};
font-size: 14px;
line-height: 1.5;
margin-bottom: 24px;
word-break: break-word;
overflow-wrap: break-word;
height: 63px;
-webkit-line-clamp: 3;
overflow: hidden;
`;

const PostDesc = styled.span<ThemeProps>` 
  color: ${({ theme }) => theme.POINT_FONT}; 
  line-height: 1.5;
  font-size: 12px;
`;

const ThumbnailWrap= styled.section`
  position: relative;
  padding-top: 52%;
`;

const Thumbnail = styled.img`
  width: 100%;
  height:100%;
  position: absolute;
  top:0;  
  object-fit: cover;
`;

const Dot = styled.span`
  margin: 0 4px;
`;

const AuthorDesc = styled.footer<ThemeProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.5;
  border-top: 1px solid ${({ theme }) => theme.TOGGLE_BACKGROUND};
`;

const  AuthorImg = styled(Image)`
  display: block;
  border-radius: 50%;
`;

const Author = styled.a<ThemeProps>`
  display: flex;
  align-items: center;
`;

const Preposition = styled.span<ThemeProps>`
color: ${({ theme }) => theme.POINT_FONT};
font-size: 12px;
margin-left: 8px;
`;

const AuthorName = styled.strong<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
`;

const Like = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 12px;
    height: 12px;
    fill: ${({ theme }) => theme.MAIN};
  }
  font-size: 12px;
  color: ${({ theme }) => theme.MAIN_FONT};
`;
