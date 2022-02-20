import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styled from '@emotion/styled';
import React, { ReactElement, useContext } from 'react';
import { ThemeContext } from '@pages/_app';
import { lightTheme, Theme } from '@styles/theme';
import { MEDIA_QUERY_END_POINT } from '@constants/.';

interface ToggleProps {
  theme: Theme;
}

const ToggleButton = styled('button')<ToggleProps>`
  position: fixed;
  width: 115px;
  height: 45px;
  right: 1.5rem;
  bottom: 1.5rem;
  border-radius: 30px;
  padding-left: 2px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  color: ${({ theme }) => theme.MAIN_FONT};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    filter: brightness(
      ${({ theme }) => (theme === lightTheme ? '0.9' : '1.13')}
    );
  }
  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
`;

const Emoji = styled.figure`
  width: 33px;
  height: 33px;
  border-radius: 100%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModeContent = styled.p`
  font-size: 0.8rem;
  margin-left: 5px;
`;

export default function DarkModeToggle(): ReactElement {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} theme={theme}>
      {theme === lightTheme ? (
        <>
          <Emoji>
            <DarkModeIcon aria-label="darkMoon" />
          </Emoji>
          <ModeContent>다크 모드</ModeContent>
        </>
      ) : (
        <>
          <Emoji>
            <LightModeIcon aria-label="lightSun" />
          </Emoji>
          <ModeContent>라이트 모드</ModeContent>
        </>
      )}
    </ToggleButton>
  );
}
