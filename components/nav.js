import Link from 'next/link'
import styles from '../styles/Nav.module.scss'

export default function Navbar() {
	return (
	<nav className={styles.nav}>
			<Link href="/" >
			<a className="navbar-brand">Reactive Stats</a>
			</Link>
	</nav>
	)
}