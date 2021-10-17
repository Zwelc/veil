import Head from "next/head";
import Link from "next/link";

import { Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [account, setAccount] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (localStorage) {
      const selected = localStorage.getItem("selected");
      if (selected) router.push(`/players/${selected}`);
    }
  }, [router]);

  if (!account)
    return (
      <>
        <Head>
          <title>DStats</title>
          <meta name="description" content="Quick stats overview for dota 2" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6" component="text">
            Stored Profiles
          </Typography>
        </Container>
      </>
    );
  return (
    <>
      <Head>
        <title>Reactive Stats</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ mt: 4 }}>
        {account}
        <Typography component="p" mt={2}>
          Reactive Stats is a small platform built for personal use that
          provides a quick overview of player stats as well as information of
          the various heroes found in the Dota 2.
        </Typography>
        <Typography variant="body" component="p" mt={2}>
          This is a passion project inspired by{" "}
          <a href="https://www.dotabuff.com/" target="_blank" rel="noreferrer">
            DotaBuff
          </a>{" "}
          and{" "}
          <a href="https://www.opendota.com/" target="_blank" rel="noreferrer">
            OpenDota
          </a>
          , built with React and Next.js
        </Typography>
        <Typography variant="body2" component="p" mt={2}>
          If you are currently not a dota 2 player, but would like to see a
          player stats overview, my profile can be found{" "}
          <Link href="/players/170365079">
            <a>here</a>
          </Link>
        </Typography>
      </Container>
    </>
  );
}
