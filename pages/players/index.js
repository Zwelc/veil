import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { Box } from "@mui/system";
import Spinner from "../../components/spinner";

const baseUrl = "https://api.opendota.com/api/search?q=";
const fetcher = query => fetch(baseUrl + query).then(res => res.json());

function Players() {
	const router = useRouter();
	const { q } = router.query;
	const { data, error } = useSWR(q, fetcher);
	
	if (error) return <div>failed to load</div>
	if(!data) return <Spinner />
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
}

export default Players;
