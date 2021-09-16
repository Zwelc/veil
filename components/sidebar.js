import Link from 'next/link'
import styles from '../styles/Nav.module.scss'

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<a>Reactive Stats</a>

			<div className={styles.wrapper}>
				<div className={styles.title}>MENU</div>
				<div className={styles.menu}>
				<Link href="/">
					<a>Home</a>
				</Link>
				<Link href="/matches">
					<a>Matches</a>
				</Link>
				<Link href="/players">
					<a>Players</a>
				</Link>
				<Link href="/heroes">
					<a>Heroes</a>
				</Link>
				</div>
			</div>
		
		</div>
	)
}

export default Sidebar;