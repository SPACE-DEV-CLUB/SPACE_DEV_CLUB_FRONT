import type { AppProps } from "next/app";
import React, { createContext } from "react";
import { css, Global, ThemeProvider } from "@emotion/react";
import { GlobalStyle } from "../styles/global-styles";
import { lightTheme, darkTheme, Theme } from "../styles/theme";
import { useDarkMode } from "../hooks/useDarkMode";
import DarkModeToggle from "../components/Home/DarkModetoggle";

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
      </>
    </ThemeContext.Provider>
  );
}

export default MyApp;
