import { useEffect, useState } from "react";
import { Theme, themeOptionsByThemeKindDict } from "../../styles/theme";
import { LocalStorage } from "../../local-storage";

const themeLocalStorage = new LocalStorage<Theme>("theme");

const toggleThemeDict: Record<Theme, Theme> = {
  dark: "light",
  light: "dark",
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const setMode = (mode: Theme) => {
    themeLocalStorage.set(mode);
    setTheme(mode);
  };

  const toggleTheme = () => setMode(toggleThemeDict[theme]);

  useEffect(() => {
    const localTheme = themeLocalStorage.get();
    if (localTheme !== null) {
      setTheme(localTheme);
    }
  }, []);

  return { theme, toggleTheme };
};
