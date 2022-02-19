import type { AppProps } from "next/app"
import React, { createContext } from "react"
import { Global } from "@emotion/react"
import { GlobalStyle } from "@styles/global-styles"
import { lightTheme, darkTheme, Theme } from "@styles/theme"
import { useDarkMode } from "@hooks/useDarkMode"
import DarkModeToggle from "@components/Home/DarkModetoggle"
import { SessionProvider } from "next-auth/react"

interface ContextProps {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {
    return null
  },
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { theme, toggleTheme } = useDarkMode()
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SessionProvider session={session}>
        <Global
          styles={GlobalStyle(theme === lightTheme ? lightTheme : darkTheme)}
        />
        <Component {...pageProps} />
        <DarkModeToggle />
      </SessionProvider>
    </ThemeContext.Provider>
  )
}

export default MyApp
