import { useCallback, useEffect, useState } from "react";
import {
  Theme,
  ThemeOptions,
  themeOptionsByThemeKindDict,
} from "../styles/theme";
import { LocalStorage } from "../local-storage";

const themeLocalStorage = new LocalStorage<Theme>("theme");

const toggleThemeDict: Record<Theme, Theme> = {
  dark: "light",
  light: "dark",
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    const selectedTheme = toggleThemeDict[theme];
    themeLocalStorage.set(theme);
    setTheme(theme);
  }, [theme, setTheme]);

  useEffect(() => {
    const localTheme = themeLocalStorage.get();
    if (localTheme != null) {
      setTheme(localTheme);
    }
  }, []);

  return { theme, toggleTheme };
};
