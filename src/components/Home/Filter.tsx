import Link from 'next/link';
import React from 'react';
import styled from '@emotion/styled';
import { Notice, SelectBox } from './index';
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from '../../constants';
import MovingIcon from '@mui/icons-material/Moving';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Theme } from '../../styles/theme';
import { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../pages/_app';
import { CardContainer } from '../Home/CardContainer';
import { MAIN_CARD_DATA } from '../../data';

interface StyledType {
  theme: Theme;
  route: string;
}

export const Filter = ({ route }: { route: string }) => {
  const { theme } = useContext(ThemeContext);

  const [filteredText, setFilteredText] = useState('이번 주');

  function handleClick(e: string) {
    setFilteredText((i) => (i = e));
  }

  useEffect(() => {
    console.log(filteredText), [filteredText];
  });

  return (
    <>
      <FilterContainer>
        <BoxContainer>
          <BoxContainer>
            <Link
              href={
                route === 'recent' || route === 'home' ? '/' : '/list/liked'
              }
              passHref
            >
              <FilterName theme={theme} route={route}>
                <TrendIcon route={route} />
                {route === 'recent' || route === 'home'
                  ? '트렌딩'
                  : '좋아요한 포스트'}
              </FilterName>
            </Link>
            <Link
              href={
                route === 'recent' || route === 'home'
                  ? '/recent'
                  : '/list/read'
              }
              passHref
            >
              <FilterName theme={theme} route={route}>
                <ClockIcon route={route} />
                {route === 'recent' || route === 'home'
                  ? '최신'
                  : '최근 읽은 포스트'}
              </FilterName>
            </Link>
            <Line theme={theme} route={route}></Line>
          </BoxContainer>
          <SelectBox onClicked={handleClick} route={route}></SelectBox>
        </BoxContainer>
        <Notice route={route}></Notice>
      </FilterContainer>
      <CardContainer filter={filteredText}></CardContainer>
    </>
  );
};

const TrendIcon = styled(MovingIcon)<{ route: string }>`
  display: ${(props) =>
    props.route === 'home' || props.route === 'recent'
      ? 'inline-block'
      : 'none'};
  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    font-size: 20px;
  }
`;
const ClockIcon = styled(AccessTimeIcon)<{ route: string }>`
  display: ${(props) =>
    props.route === 'home' || props.route === 'recent'
      ? 'inline-block'
      : 'none'};
  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    font-size: 20px;
  }
`;
const FilterName = styled.a<StyledType>`
  font-weight: bold;
  width: ${(props) =>
    props.route === 'home' || props.route === 'recent' ? '80px' : '144px'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  color: ${(props) =>
    props.route === 'home' || props.route === 'liked'
      ? props.theme.MAIN_FONT
      : props.theme.POINT_FONT};
  height: 48px;
  & + & {
    color: ${(props) =>
      props.route === 'home' || props.route === 'liked'
        ? props.theme.POINT_FONT
        : props.theme.MAIN_FONT};
  }
  @media (min-width: 1024px) {
    font-size: 18px;
    width: ${(props) =>
      props.route === 'home' || props.route === 'recent' ? '112px' : '144px'};
  }
`;

const Line = styled.div<StyledType>`
  width: 50%;
  left: ${(props) =>
    props.route === 'home' || props.route === 'liked' ? '0%' : '50%'};
  height: 2px;
  position: absolute;
  bottom: 0px;
  background: ${({ theme }) => theme.MAIN_FONT};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  align-items: center;
  margin: 0 auto;

  @media (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    max-width: ${MEDIA_QUERY_END_POINT.LARGE};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    max-width: 1728px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;
