import { ThemeProvider } from "styled-components";
import "@fontsource/noto-sans";
import "@fontsource/noto-sans-kr";
import { darkTheme } from "../styles/theme";
import { media } from "../styles/media";
import GlobalStyle from "../styles/globalStyle";
import Layout from "./layout";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={{ ...darkTheme, ...media }}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
