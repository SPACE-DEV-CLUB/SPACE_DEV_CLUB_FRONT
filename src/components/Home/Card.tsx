import styled from '@emotion/styled';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import SAMPLE_IMG from '../../../public/image/sampleUser2.jpg';
import { Theme } from '../../styles/theme';
import { useContext } from 'react';
import { ThemeContext } from '../../pages/_app';

interface ThemeProps {
  theme: Theme;
}

export const PostCard = ({
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
  thumbnail,
}: {
  imageUrl: string;
  postTitle: string;
  postDesc: string;
  tags: Array<string>;
  date: Date;
  comment: number;
  username: string | string[] | undefined;
  mySearch?: boolean;
  count?: number;
  day?: number;
  thumbnail: string;
}) => {
  const { theme } = useContext(ThemeContext);
  const formatDate = (date: Date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '년 ' + month + '월 ' + day + '일';
  };
  return (
    <Card theme={theme}>
      <Link href="/" passHref>
        <a>
          <Thumbnail src={thumbnail} alt="" />

          <Contents theme={theme}>
            <h4>{postTitle}</h4>
            <p>{postDesc}</p>
            <div>
              <span>{formatDate(date)}</span>
              <Dot>&#183;</Dot>
              <span>{comment}개의 댓글</span>
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
