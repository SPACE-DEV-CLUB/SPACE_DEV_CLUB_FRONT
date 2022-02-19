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
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: "light",
  toggleTheme: () => {
    return null;
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { theme, toggleTheme } = useTheme();
  const globalStyles = useMemo(
    () => GlobalStyle(themeOptionsByThemeKindDict[theme]),
    [theme]
  );
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SessionProvider session={session}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
        <DarkModeToggle />
      </SessionProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
