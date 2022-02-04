import type { AppProps } from 'next/app';
import React, { createContext } from 'react';
import { Global } from '@emotion/react';
import { GlobalStyle } from '../styles/global-styles';
import { lightTheme, darkTheme, Theme } from '../styles/theme';
import { useDarkMode } from '../hooks/useDarkMode';
import DarkModeToggle from '../components/Home/DarkModetoggle';
import EasterEgg from '../components/Common/EasterEgg';

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>
        <Global
          styles={GlobalStyle(theme === lightTheme ? lightTheme : darkTheme)}
        />
        <Component {...pageProps} />
        <DarkModeToggle />
        <EasterEgg />
      </>
    </ThemeContext.Provider>
  );
}

export default MyApp;
