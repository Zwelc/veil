import styles from '../../styles/Player.module.scss';
import Link from 'next/link'

function Players() {
	return(
	<div className={styles.main}>
	<div>
		<input type="search" />
		<button>Search</button>
		<Link href="/players/170365079">
			My Personal Profile
		</Link>
	</div>
</div>)
}

export default Players;