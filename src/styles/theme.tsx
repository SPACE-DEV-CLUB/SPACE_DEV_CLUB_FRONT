export type ThemeOptions = {
  MAIN: string;
  SUB: string;
  BACKGROUND: string;
  SUBBACKGROUND: string;
  CARD_BACKGROUND: string;
  MAIN_FONT: string;
  SUB_FONT: string;
  POINT_FONT: string;
  ICON: string;
  BORDER: string;
  TOGGLE_BACKGROUND: string;
  LOGO: string;
  BUTTON_MAIN: string;
  BUTTON_SUB: string;
  WARNING_MAIN: string;
  WARNING_SUB: string;
  ModelRGBA: string;
};

export type Theme = "dark" | "light";

export const lightTheme: ThemeOptions = {
  MAIN: "#6868AD",
  SUB: "#dbd7ff",
  BACKGROUND: "#fdfdff",
  SUBBACKGROUND: "rgb(242, 240, 253)",
  CARD_BACKGROUND: "#fff",
  MAIN_FONT: "#202124",
  SUB_FONT: "#30373e",
  POINT_FONT: "#868E96",
  ICON: "#596168",
  BORDER: "#b6bec7",
  TOGGLE_BACKGROUND: "#f0f0f4",
  LOGO: "/image/스데브로고.png",
  BUTTON_MAIN: "#8080b8",
  BUTTON_SUB: "#b6b1e9",
  WARNING_MAIN: "#ef5350",
  WARNING_SUB: "#ff867c",
  ModelRGBA: "rgba(255, 255, 255, 0.8)",
};

export const darkTheme: ThemeOptions = {
  MAIN: "#dbd7ff",
  SUB: "#6868AD",
  BACKGROUND: "#202124",
  SUBBACKGROUND: "#30373e",
  CARD_BACKGROUND: "#121214",
  MAIN_FONT: "#fdfdff",
  SUB_FONT: "#b6bec7",
  POINT_FONT: "#868E96",
  ICON: "#596168",
  BORDER: "#272a57",
  TOGGLE_BACKGROUND: "#30373e",
  LOGO: "/image/스데브로고_darkmode.png",
  BUTTON_MAIN: "#8b8bc9",
  BUTTON_SUB: "#8b88aa",
  WARNING_MAIN: "#ffa4a2",
  WARNING_SUB: "#e57373",
  ModelRGBA: "rgba(0, 0, 0, 0.8)",
};

export const themeOptionsByThemeKindDict: Record<Theme, ThemeOptions> = {
  dark: darkTheme,
  light: lightTheme,
};

// #ffffff*
// #fefaff*
// #ede9ff
// #dbd7ff*
// #9896df*
// #6868AD*
// #393e7d*
// #272a57

// #fdfdff
// #f0f0f4*
// #b6bec7*
// #868E96*
// #596168*
// #30373e*
// #202124*
// #121214*
