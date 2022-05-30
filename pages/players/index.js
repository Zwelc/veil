import Link from "next/link";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@mui/system";
import Spinner from "../../components/spinner";
import { Container } from "@mui/material";
import PlayerCard from "../../components/player/card";

const baseUrl = "https://api.opendota.com/api/search?q=";
const fetcher = (query) => fetch(baseUrl + query).then((res) => res.json());

function Players() {
  const router = useRouter();
  const { q } = router.query;
  const { data, error } = useSWR(q, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;
  if (data)
    return (
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          mt: 4,
          gap: 2,
          p: 5,
        }}
      >
        {data.map((player) => (
          <Box sx={{ p: 3 }} key={player.account_id}>
            <PlayerCard player={player} path="/players" />
          </Box>
        ))}
      </Container>
    );
}

export default Players;
