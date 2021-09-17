import Image from 'next/image'
import styles from '../styles/Header.module.scss'

function Header(props) {
	const player = props.player;
	return (
		<header className={styles.container}>
		<div className={styles.avatar}>
		<Image className={styles.avatarimg} src={player.profile.avatarfull} width={150} height={150} alt="..."/>
		<div className={styles.name}>{player.profile.personaname}</div>
		</div>
			<p>Solo MMR: {player.solo_competitive_rank}</p>
		<div className={styles.right}>
			Rank: {player.rank_tier}
		</div>
		</header>
	)
}

export default Header;