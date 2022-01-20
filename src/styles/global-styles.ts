import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";

interface ThemeInterface {
  theme: Theme;
}

export const GlobalStyle = (props: Theme) =>
  css`
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo",
        "Noto Sans KR", "Malgun Gothic", sans-serif;
    }
    ol,
    ul {
      list-style: none;
    }
    blockquote,
    q {
      quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: "";
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    a {
      color: black;
      text-decoration: none;
      outline: none;
      cursor: pointer;
    }
    button {
      background: inherit;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
    }
    .sr-only {
      position: absolute;
      margin: -1px;
      width: 1px;
      height: 1px;
      padding: 0;
      border: 0;
      white-space: nowrap;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
    }
    body {
      background: ${props.BACKGROUND};
      color: ${props.MAIN_FONT};
    }

    /*Overriding global styles*/
    .editor {
      h1 {
        display: block;
        font-size: 2em;
        margin-top: 0.67em;
        margin-bottom: 0.67em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
      }

      h2 {
        display: block;
        font-size: 1.5em;
        margin-top: 0.83em;
        margin-bottom: 0.83em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
      }

      h3 {
        display: block;
        font-size: 1.17em;
        margin-top: 1em;
        margin-bottom: 1em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
      }

      h4 {
        display: block;
        font-size: 1em;
        margin-top: 1.33em;
        margin-bottom: 1.33em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
      }

      em {
        font-style: italic;
        font-size: 1.125rem;
        color: rgb(34, 36, 38);
        line-height: 1.7;
        letter-spacing: -0.004em;
        word-break: keep-all;
        overflow-wrap: break-word;
      }

      a:link,
      a:visited {
        color: rgb(12, 166, 120);
        text-decoration: underline;

        cursor: auto;
      }

      a:link:active,
      a:visited:active {
        color: rgb(12, 166, 120);
      }

      del {
        text-decoration: line-through;
        font-size: 1.125rem;
        color: rgb(34, 36, 38);
        line-height: 1.7;
        letter-spacing: -0.004em;
        word-break: keep-all;
        overflow-wrap: break-word;
      }

      blockquote {
        margin: 2rem 0px;
        border-left: 4px solid rgb(32, 201, 151);
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: rgb(248, 249, 250);
        padding: 1rem 1rem 1rem 2rem;
        color: rgb(33, 37, 41);
      }

      img {
        display: block;
        margin: 3rem auto;
        max-width: 100%;
      }

      strong {
        font-size: 1.125rem;
        color: rgb(34, 36, 38);
        line-height: 1.7;
        letter-spacing: -0.004em;
        word-break: keep-all;
        overflow-wrap: break-word;
      }

      pre {
        box-shadow: rgb(0 0 0 / 2%) 0px 0px 2px;
        background: rgb(251, 252, 253);
        color: rgb(36, 41, 46);
        font-size: 0.875rem;
        padding: 1rem;
        border-radius: 4px;
        line-height: 1.5;
        overflow-x: auto;
        letter-spacing: 0px;
        display: block;
        font-family: monospace;
        white-space: pre;
        margin: 1em 0px;
      }
    }
  `;
