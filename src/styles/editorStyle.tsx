import { css } from "@emotion/react";
import { lightTheme } from "../styles/theme";

const editorStyle = css`
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
    color: ${lightTheme.MAIN};
    text-decoration: underline;

    cursor: auto;
  }

  a:link:active,
  a:visited:active {
    color: ${lightTheme.MAIN};
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
    border-left: 4px solid ${lightTheme.MAIN};
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
`;

export default editorStyle;
