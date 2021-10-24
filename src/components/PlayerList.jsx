import { Container } from "@mui/material";
import React from "react";

import Player from "./Player";

export default function PlayerList({ players }) {
  return (
    <Container sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {players.map((player) => (
        <Player
          key={player.account_id}
          avatarfull={player.avatarfull}
          personaname={player.personaname}
        />
      ))}
    </Container>
  );
}
