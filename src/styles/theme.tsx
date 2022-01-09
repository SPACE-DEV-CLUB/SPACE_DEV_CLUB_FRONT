import { css } from "styled-components";

const theme = {
  cardBackground: "#F4F4F4",
  fontColor: "#1D1D1D",
  subFontColor: "#CBCBCB",
  mainColor: "#1DBE8E",

  setFlex: (justifyContent = "center", alignItem = "center") => css`
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItem};
  `,
};

export default theme;
