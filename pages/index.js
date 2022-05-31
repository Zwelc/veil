import Head from "next/head";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, TextField } from "@mui/material";
import { Typography, Container, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import PlayerCard from "../components/player/card";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../components/search";

export default function Home() {
  const router = useRouter();
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage) {
      const storedProfiles = JSON.parse(localStorage.getItem("id"));
      if (storedProfiles) {
        setPlayers(storedProfiles.players);
      }
    }
  }, []);
  return (
    <>
      <Head>
        <title>Veil</title>
        <meta name="description" content="Quick stats overview for dota 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Search />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" component="text">
            Tracked Players
            <Divider />
            {players.length > 0 ? (
              <Container
                sx={{
                  m: 3,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                }}
              >
                {players.map((player) => (
                  <Box sx={{ p: 3 }} key={player.account_id}>
                    <PlayerCard player={player} action={setPlayers} path="" />
                  </Box>
                ))}
              </Container>
            ) : (
              <Container>
                <Typography variant="body">
                  There are no tracked profiles currently. Please use the
                  searchbar to get started
                </Typography>
              </Container>
            )}
          </Typography>
        </Box>
      </Container>
    </>
  );
}
