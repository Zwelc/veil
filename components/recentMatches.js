import MatchRow from "./matchRow";

function RecentMatches(props) {
	const recent = props.recent;
	const heroes = props.heroes;
	const mode = props.mode;
	const lobby = props.lobby;

	return (
		<table>
		<thead>
		<tr>
			<th scope="col">Hero</th>
			<th scope="col">KDA</th>
			<th scope="col">Bracket</th>
			<th scope="col">Type</th>
			<th scope="col">Result</th>
			<th scope="col">Duration</th>
		</tr>
		</thead>
			<tbody>
				{recent.map(match => <MatchRow key={match.match_id} matches={match} heroes={heroes} mode={mode} lobby={lobby}/>)}
			</tbody>
		</table>
	)
}

export default RecentMatches;