import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '../components/layout'
import theme from '../lib/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';

function MyApp({ Component, pageProps }) {
  return (
	<>
	<Head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	</Head>
	<ThemeProvider theme={theme}>
	<CssBaseline />
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ThemeProvider>
	</>)
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
