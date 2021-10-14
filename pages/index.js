import Head from "next/head";
import Link from "next/link";

import { Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Reactive Stats</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<Container sx={{mt: 4}}>

			<Typography variant="h3" component="p">
					Reactive Stats is a small platform built for personal use that provides a quick overview of player stats as well as information of the various heroes found in the Dota 2.
				</Typography>
        <Typography variant="h5" component="p">
					This is a passion project inspired by <a href="https://www.dotabuff.com/" target="_blank" rel="noreferrer">DotaBuff</a> and <a href="https://www.opendota.com/" target="_blank" rel="noreferrer">OpenDota</a>, built with React and Next.js 
				</Typography>
        <Typography variant="subtitle" component="p">
					If you are currently not a dota 2 player, but would like to see a player stats overview, my profile can be found <Link href="/players/170365079"><a>here</a></Link>
				</Typography>
			</Container>
    </>
  );
}
