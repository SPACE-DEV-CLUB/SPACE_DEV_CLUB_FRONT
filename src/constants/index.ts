export const API_ENDPOINT = "https://secret-hollows-17182.herokuapp.com/api"

export const MEDIA_QUERY_END_POINT = {
  MOBILE: "768px",
  TABLET: "1024px",
  DESKTOP: "1200px",
  LARGE: "1440px",
  XLARGE: "1919px",
}

export const ROUTES = [
  {
    ID: 0,
    PATH: "/",
    LABEL: "Home",
  },
  {
    ID: 1,
    PATH: "/recent",
    LABEL: "Recent",
  },
  {
    ID: 2,
    PATH: "/search",
    LABEL: "Search",
  },
]

export const PALLETS_LIGHT = {
  MAIN: "#6868AD",
  SUB: "#e8e8fa",
  BACKGROUND: "#f8f9fa",
  SUBBACKGROUND: "#f0f2f5",
  CARD_BACKGROUND: "#fff",
  MAIN_FONT: "#202124", //rgb(52, 58, 64)
  SUB_FONT: "#495057",
  POINT_FONT: "#868E96",
  ICON: "#868E96",
  BORDER: "#adb6bd",
}

export const PALLETS_DARK = {
  MAIN: "#6868AD",
  SUB: "#e8e8fa",
  BACKGROUND: "#202124",
  CARD_BACKGROUND: "#1e1e1e",
  MAIN_FONT: "rgba(255, 255, 255, 0.87)",
  SUB_FONT: "rgba(255, 255, 255, 0.6)",
  ICON: "#868E96",
  BORDER: "#dae4ed", //수정 될 가능성 높음
}
