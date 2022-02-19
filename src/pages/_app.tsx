import type { AppProps } from "next/app";
import React, { createContext, useMemo } from "react";
import { Global } from "@emotion/react";
import { GlobalStyle } from "../styles/global-styles";
import {
  lightTheme,
  darkTheme,
  Theme,
  ThemeOptions,
  themeOptionsByThemeKindDict,
} from "../styles/theme";
import { useTheme } from "../hooks/useTheme";
import DarkModeToggle from "../components/Home/DarkModetoggle";
import { SessionProvider } from "next-auth/react";

interface ContextProps {
  theme: ThemeOptions;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { theme, toggleTheme } = useTheme();
  const themeProps = useMemo(() => themeOptionsByThemeKindDict[theme], [theme]);
  const globalStyles = useMemo(() => GlobalStyle(themeProps), [themeProps]);
  return (
    <ThemeContext.Provider value={{ theme: themeProps, toggleTheme }}>
      <SessionProvider session={session}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
        <DarkModeToggle />
      </SessionProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
