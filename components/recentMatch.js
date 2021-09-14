import { convertHMS } from '../lib/time'
import Image from 'next/image'

function RecentMatch(props) {
	const match = props.matches;
	const heroes = props.heroes;
	const hero = heroes[match.hero_id];
	const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
	return (
		<tr>
		<td><Image src={heroImg} height={29} width={59}/></td>
		<td>{hero.localized_name}</td>
		<td>{match.player_slot <= 127 && match.radiant_win ? "Won Match" : "Lost Match"}</td>
		<td>{convertHMS(match.duration)}</td>
		<td>{match.kills}/{match.deaths}/{match.assists}</td>
		</tr>
	)
}

export default RecentMatch;