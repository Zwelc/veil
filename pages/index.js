import Head from "next/head";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Typography, Container, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";

export default function Home() {
  const router = useRouter();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (localStorage) {
      const selected = localStorage.getItem("selected");
      // if (selected) router.push(`/players/${selected}`);
      const storedProfiles = JSON.parse(localStorage.getItem("id"));
      if (storedProfiles) {
        setPlayers(storedProfiles.players);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>DStats</title>
        <meta name="description" content="Quick stats overview for dota 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6" component="text">
            Stored Profiles
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
                    <Link href={`/players/${player.account_id}`} passHref>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="210"
                            image={player.avatarfull}
                            alt={player.personaname}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {player.personaname}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Box>
                ))}
              </Container>
            ) : (
              <Container>
                <Typography variant="body">
                  There are no stored profiles currently. Please use the
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
