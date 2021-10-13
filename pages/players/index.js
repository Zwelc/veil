import styles from "../../styles/Player.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Main from "../../components/layout/main";
import SearchBar from "../../components/searchbar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { Box } from "@mui/system";

const baseUrl = "https://api.opendota.com/api/search?q=";
const fetcher = query => fetch(baseUrl + query).then(res => res.json());

function Players() {
	const router = useRouter();
	const { q } = router.query;
	const [players, setPlayers] = useState([]);
	const { data, error } = useSWR(q, fetcher);
	
  function handleClick() {
    const query = document.getElementById("search").value;
    fetch(baseUrl + query)
      .then((res) => res.json())
      .then((results) => setPlayers(results));
  }
	if (error) return <div>failed to load</div>
	if(!data) return <div>loading...</div>
	if(data) return (
		<Box sx={{p:3}}>
		{data.map((player) => (
			<Link
				href={`/players/${player.account_id}`}
				key={player.account_id}
				>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="210"
							image={player.avatarfull}
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
							{player.personaname}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Link>
			))}
	</Box>
	);
	// if(players) return (
  //   <Main>
  //     <SearchBar onClick={handleClick} />
  //     <div className={styles.container}>
  //       <div className={styles.results}>
  //         {players.map((player) => (
  //           <Link
  //             href={`/players/${player.account_id}`}
  //             key={player.account_id}
  //           >
  //             <div className={styles.card}>
  //               <header>
  //                 <Image src={player.avatarfull} width={215} height={210} />
  //               </header>
  //               <div className={styles.card_body}>{player.personaname}</div>
  //               <div>Last Seen: {player.last_match_time} </div>
  //             </div>
  //           </Link>
  //         ))}
  //       </div>
  //     </div>
  //   </Main>
  // );
}

export default Players;
