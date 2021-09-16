import Sidebar from "./sidebar";
import styles from '../styles/wrapper.module.scss'

export default function Layout({children}) {
	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<div className={styles.main}>
			<div className={styles.header}>
			<main className={styles.container}>{children}</main>
			</div>
			</div>
		</div>
	)
}