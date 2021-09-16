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
			<th>KDA</th>
			<th>Bracket</th>
			<th>Type</th>
			<th>Result</th>
			<th>Duration</th>
		</tr>
		</thead>
			<tbody>
				{recent.map(match => <MatchRow key={match.match_id} matches={match} heroes={heroes} mode={mode} lobby={lobby}/>)}
			</tbody>
		</table>
	)
}

export default RecentMatches;