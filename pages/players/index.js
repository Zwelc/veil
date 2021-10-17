import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box } from "@mui/system";
import Spinner from "../../components/spinner";
import { Container } from "@mui/material";
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
            <Link href={`/players/${player.account_id}`} passHref>
              <Card
                sx={{ maxWidth: 345 }}
                onClick={() => {
                  let players = [localStorage.getItem("id")];
                  if (players.length > 0) {
                    players.push(player.account_id);
                  } else {
                    players = [player.account_id];
                  }
                  localStorage.setItem("id", players);
                  localStorage.setItem("selected", player.account_id);
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="210"
                    image={player.avatarfull}
                    alt={player.personaname}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {player.personaname}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Box>
        ))}
      </Container>
    );
}

export default Players;
