import RecentMatches from "../../components/player/recent/recentMatches";
import Head from "next/head";
import Profile from "../../components/player/profile";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import Heroes from "../../components/player/heroes";
import ProfileWinrate from "../../components/player/winrate";
import ProfileCounts from "../../components/player/counts";

export default function Player({ id, player }) {
  return (
    <>
      <Head>
        <title>Veil - {player.profile.personaname} overview</title>
        <meta
          name="description"
          content={`Veil - ${player.profile.personaname} overview`}
        />
      </Head>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          mt: 4,
          gap: 2,
        }}
      >
        <Box sx={{ gridTemplateRows: "repeat(2, 1fr)" }}>
          <Box>
            <Heroes id={id} />
          </Box>
          <Box>
            <Typography variant="h6" component="div">
              Recent Matches
            </Typography>
            <RecentMatches id={id} />
          </Box>
        </Box>
        <Box sx={{ gridTemplateRows: "repeat(2, 1fr)" }}>
          <Box>
            <Profile id={id} />
          </Box>
          <Box>
            <ProfileWinrate id={id} />
          </Box>
          <Box>
            <ProfileCounts id={id} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const playerId = context.params.player;
  const playerData = await fetch(
    `https://api.opendota.com/api/players/${playerId}`
  );
  const player = await playerData.json();

  return {
    props: {
      id: playerId,
      player,
    },
  };
}
