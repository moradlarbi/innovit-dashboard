import {useState} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import "../styles/globals.css";
import AppContext from "../lib/AppContext";
import { AppProvider } from '../src/context/app.context';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const overridedLightTheme = {
    ...theme,
    palette: {
        ...theme.palette,
        primary: {
            main: "#11B07A",
            contrastText: "#fff"
        },
        // secondary: {
        //     main: "#fff",
        //     secondary: "#000",
        //     contrastText: "#000"
        // },
        // third: {
        //   main: "#F9A400"
        // },
        // error: {
        //   main: "#C80000",
        //   lighter: "#FFE8E8"
        // },
        // text: {
        //   disabled: "#c1c1c1",
        //   primary: "#000",
        //   secondary: "#373737",
        // }
    },
};
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);
  const [user, setUser] = useState();
  return (
    <AppProvider>
      <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={overridedLightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppContext.Provider
          value={{
            state: {
              user: user,
              isAuth: true,
            },
            setUser: setUser,
          }}
        >
          <Component {...pageProps} />
        </AppContext.Provider>
      </ThemeProvider>
    </CacheProvider>
    </AppProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
