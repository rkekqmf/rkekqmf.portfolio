import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

html {
  font-family: "Noto Sans", "Noto Sans KR", sans-serif;
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
  overscroll-behavior-y: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#__next {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.bgColor};
  width: 100%;
  min-height: 100vh;
  color: ${({ theme }) => theme.fontColor};
  transition: 0.2s;
}
  
a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
`;

export default GlobalStyle;
