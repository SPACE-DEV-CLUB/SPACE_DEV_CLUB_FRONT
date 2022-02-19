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
  const [theme, setTheme] = useState<Theme>(themeLocalStorage.get() ?? "light");

  const toggleTheme = useCallback(
    () =>
      setTheme((prev) => {
        const selectedTheme = toggleThemeDict[prev];
        themeLocalStorage.set(selectedTheme);
        return selectedTheme;
      }),
    [setTheme]
  );

  return { theme, toggleTheme };
};
