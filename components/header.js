import Image from 'next/image'
import styles from '../styles/Header.module.scss'

function Header(props) {
	const player = props.player;
	return (
		<header className={styles.container}>
		<div className={styles.left}>
		<Image src={player.profile.avatarfull} width={128} height={92} alt="..."/>
		<div>
			<span className={styles.name}>{player.profile.personaname}</span>
			<p>Solo MMR: {player.solo_competitive_rank}</p>
		</div>
		</div>
		<div className={styles.right}>
			Rank: {player.rank_tier}
		</div>
		</header>
	)
}

export default Header;