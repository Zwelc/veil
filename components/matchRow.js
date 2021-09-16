import { convertHMS } from '../lib/time'
import Image from 'next/image'

function getSkill(int) {
	if (int == 1) return 'Normal Skill'
	if (int == 2) return 'High Skill'
	if (int == 3) return 'Very High Skill'
	return 'Unknown Skill';
}
function MatchRow(props) {
	const match = props.matches;
	const heroes = props.heroes;
	const mode = props.mode[match.game_mode];
	const lobby = props.lobby[match.lobby_type];
	const hero = heroes[match.hero_id];
	const heroImg = `https://steamcdn-a.akamaihd.net/${hero.img}`;
	return (
		<tr>
		<td><Image src={heroImg} height={29} width={59}/></td>
		<td>{match.kills}/{match.deaths}/{match.assists}</td>
		<td>{getSkill(match.skill)}</td>
		<td>{lobby.name.slice(10).split("_").join(" ")}{mode.name.slice(9).split("_").join(" ")}</td>
		<td>{match.player_slot <= 127 && match.radiant_win ? "Won Match" : "Lost Match"}</td>
		<td>{convertHMS(match.duration)}</td>
		</tr>
	)
}

export default MatchRow;