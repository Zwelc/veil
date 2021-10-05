import Link from "next/link";
import styles from "../../styles/Nav.module.scss";

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
          <Link href="/heroes">
            <a>Heroes</a>
          </Link>
          <Link href="/players">
            <a>Players</a>
          </Link>
          <Link href="/matches">
            <a>Matches</a>
          </Link>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          LEARN MORE <span className="material-icons md-12">open_in_new</span>
        </div>
        <div className={styles.menu}>
          <Link href="https://www.dota2.com/home">
            <a target="_blank">Dota 2</a>
          </Link>
          <Link href="https://docs.opendota.com/#section/Introduction">
            <a target="_blank">OpenDota API</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
