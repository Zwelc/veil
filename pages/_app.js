import Head from "next/head";
import Layout from "../components/layout";
import theme from "../lib/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import { SearchContext } from "../context/searchContext";
import { useState } from "react";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <SearchContext.Provider value={{ search, setSearch }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
