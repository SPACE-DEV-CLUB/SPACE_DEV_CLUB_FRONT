import styled from '@emotion/styled';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import SAMPLE_IMG from '../../../public/image/sampleUser2.jpg';
import { ThemeOptions } from '../../styles/theme';
import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';
import { handleDate } from '../../utils/date';
interface ThemeProps {
  theme: ThemeOptions;
}

export const PostCard = ({
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

  return (
    <Card theme={theme}>
      <Link href={`/@${username}`} passHref>
        <a>
          <Thumbnail src={thumbnail} alt="" />

          <Contents theme={theme}>
            <h4>{title}</h4>
            <p>{contents}</p>
            <div>
              <span>{handleDate(publishedAt)}</span>
              <Dot>&#183;</Dot>
              <span>{comments || 0}개의 댓글</span>
            </div>
          </Contents>
        </a>
      </Link>
      <Desc>
        <Link href="/" passHref>
          <Author theme={theme}>
            <Profileimg
              src={SAMPLE_IMG}
              alt=""
              width={24}
              height={24}
            ></Profileimg>
            <span>
              by
              <strong> {username}</strong>
            </span>
          </Author>
        </Link>
        <Like theme={theme}>
          <FavoriteIcon />
          <span>{count}</span>
        </Like>
      </Desc>
    </Card>
  );
};

const Card = styled.article<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.CARD_BACKGROUND};
  border-radius: 14px;
  transition: ease-in-out 0.25s;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(0 0 0 / 0.3) 0px 4px 16px 0px;
  }
`;

const Contents = styled.div<ThemeProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  h4 {
    color: ${({ theme }) => theme.MAIN_FONT};
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    margin-bottom: 4px;
    word-break: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.SUB_FONT};
    line-height: 1.5;
    margin-bottom: 24px;
    word-break: break-word;
    overflow-wrap: break-word;
    height: 63px;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  span {
    line-height: 1.5;
    font-size: 12px;
    color: ${({ theme }) => theme.POINT_FONT};
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`;

const Dot = styled.span`
  margin: 0 4px;
`;

const Desc = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.5;
`;

const Profileimg = styled(Image)`
  display: block;
  border-radius: 50%;
`;

const Author = styled.a<ThemeProps>`
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.POINT_FONT};
    font-size: 12px;
    margin-left: 8px;
    strong {
      color: ${({ theme }) => theme.MAIN_FONT};
    }
  }
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
