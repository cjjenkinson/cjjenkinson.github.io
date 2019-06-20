import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: none;
    font-family: 'Work Sans', sans-serif;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  ul {
    margin: 0 auto;
  }
  img {
    display: block;
    width: 100%;
  }
  h1, h2, h3, h4, h5 {
    line-height: 1.6em;
    margin-top: 0;
    font-family: 'Work Sans', sans-serif;
  }
  h1 {
    font-weight: 600
  }
  h2 {
    font-weight: 600
  }
  h3 {
    font-weight: 500
  }
  h4 {
    font-weight: 400
  }
  h5 {
    font-weight: 400;
    text-transform: uppercase;
  }
  p, span, input, button, input, optgroup, select, textarea {
    margin-top: 0;
  }
  .wrapper {
    width: calc(100% - 10vmin);
    margin: 0 auto;
    padding: 5vmin 0;
  }
  .article-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5vmin;
  }
  .section-headline {
    padding: 0 0 0.4em 0;
    margin: 0 0 5vmin 0;
    border-bottom: 1px solid #ddd;
  }
  .list-inline {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .list-inline li {
    display: inline-block;
  }
`