import styles from '../styles/Player.module.scss'

function Profile(props) {
	const player = props.player;
	return(
		<div className={styles.container}>
		<div className={styles.header}>
			<img src={player.profile.avatarfull} />
			<div className={styles.name}>{player.profile.personaname}</div>
		</div>
		<p>Solo MMR: {player.solo_competitive_rank}</p>
		<div className={styles.right}>
			Rank: {player.rank_tier}
		</div>
		</div>
	);
}

export default Profile;