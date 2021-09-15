import Link from 'next/link'
import RecentMatch from '../../components/recentMatch';
import Image from 'next/image'
import Navbar from '../../components/nav';
import UserCounts from '../../components/counts';

function Player({player, recent, heroes, mode, lobby, counts}) {

	return (
		<>
		{/* <Navbar /> */}
		<UserCounts counts={counts}/>
		<div className="container">
		<div className="row">
		<div className="col">
		<div className="card mb-3 shadow-sm" style={{maxWidth: "540px"}}>
		<div className="row g-0">
    <div className="col-md-4">
      <Image src={player.profile.avatarfull} width={128} height={92} className="img-fluid rounded-start" alt="..."/>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{player.profile.personaname}</h5>
        <p className="card-text">Solo MMR: {player.solo_competitive_rank}</p>
        {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
				Rank: {player.rank_tier}
				<hr />
				Until: {player.tracked_until}
				<hr />
				Dota Plus: {player.profile.plus}
				<hr /> login:  {player.profile.last_login}
      </div>
    </div>
  </div>
	</div>
	</div>
		<div className="col">
		<div className="card shadow-sm">
		<h6>Recent Matches</h6>
		<table className="table table-striped">
		<thead className="table-dark">
		<tr>
			<th scope="col" colSpan={2} className="text-center">Hero</th>
			<th>Result</th>
			<th>Duration</th>
			<th>KDA</th>
			<th>Bracket</th>
			<th>Mode</th>
			<th>Lobby</th>
		</tr>
		</thead>
			<tbody>
				{recent.map(match => <RecentMatch key={match.match_id} matches={match} heroes={heroes} mode={mode} lobby={lobby}/>)}
			</tbody>
		</table>
		</div>
		</div>
		</div>
</div>
		</>
	)
}

export async function getServerSideProps(context) {
	const playerId = context.params.player;
	const playerData = await fetch(`https://api.opendota.com/api/players/${playerId}`);
	const player = await playerData.json();
	const recentData = await fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`);
	const recent = await recentData.json();
	const heroesData = await fetch(`https://api.opendota.com/api/constants/heroes`);
	const heroes = await heroesData.json();
	const modeData = await fetch(`https://api.opendota.com/api/constants/game_mode`);
	const mode = await modeData.json();
	const lobbyData = await fetch(`https://api.opendota.com/api/constants/lobby_type`);
	const lobby = await lobbyData.json();
	const countsData = await fetch(`https://api.opendota.com/api/players/${playerId}/counts`);
	const counts = await countsData.json();

	return {	
		props: {
			player,
			recent,
			heroes,
			mode,
			lobby,
			counts
		 }
		}
}

export default Player;