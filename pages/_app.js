import '../styles/globals.scss'
import Head from 'next/head'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
	<>
	<Head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	</Head>
	<Layout>
		<Component {...pageProps} />
	</Layout>
	</>)
}

export default MyApp
