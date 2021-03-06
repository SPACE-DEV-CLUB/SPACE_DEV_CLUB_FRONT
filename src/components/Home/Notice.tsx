import styled from '@emotion/styled';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { ThemeContext } from '@pages/_app';
import { Theme } from '@styles/theme';

interface StyledType {
  theme: Theme;
  visible: boolean;
}

interface ThemeProps {
  theme: Theme;
}

const OPTIONS = [
  { key: 'notice', value: 'notice', link: '/@sdv', name: '공지사항' },
  { key: 'tag', value: 'tag', link: '/tags', name: '태그 목록' },
  { key: 'policy', value: 'policy', link: '/policy', name: '서비스 정책' },
  {
    key: 'EasterEgg',
    value: 'EasterEgg',
    link: '/introduce',
    name: 'easter egg',
  },
];

export const Notice = ({ route }: { route: string }) => {
  const { theme } = useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const boxClickHandler = () => {
    setVisible(!visible);
  };

  return (
    <Container route={route}>
      <Button onClick={boxClickHandler}>⋮</Button>
      <Box theme={theme} visible={visible}>
        {OPTIONS.map((option) => {
          const { key, value, name, link } = option;
          return (
            <List theme={theme} key={key} value={value}>
              <Link href={link} passHref>
                <Anchor theme={theme}>{name}</Anchor>
              </Link>
            </List>
          );
        })}
        <List theme={theme}>
          <Link href={'mailto:spacedevclub@gmail.com'} passHref>
            <Anchor theme={theme}>
              문의 <AnchorDesc>spacedevclub@gmail.com</AnchorDesc>
            </Anchor>
          </Link>
        </List>
      </Box>
    </Container>
  );
};

const Container = styled.div<{ route: string }>`
  display: ${({ route }) =>
    route === 'home' || route === 'recent' ? 'block' : 'none'};
  position: relative;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
`;

const Button = styled.div`
  color: rgb(134, 142, 150);
`;
const Box = styled.div<StyledType>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};
  top: 125%;
  right: 0;
  margin-top: 8px;
  width: 192px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  padding: 0;
  z-index: 10;
`;

const List = styled.li<ThemeProps>`
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  line-height: none;
  color: ${({ theme }) => theme.MAIN_FONT};

  & + & {
    border-top: 1px solid ${({ theme }) => theme.POINT_FONT};
  }

  &:last-child {
    font-size: 12px;
  }
`;

const Anchor = styled.a<ThemeProps>`
  display: block;
  color: ${({ theme }) => theme.MAIN_FONT};
  padding: 12px 16px;
`;

const AnchorDesc = styled.p`
  font-weight: 400;
  font-size: 12px;
`;
