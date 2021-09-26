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
            <a>
              <span className="material-icons md-18">home</span>Home
            </a>
          </Link>
          <Link href="/players">
            <a>
              <span className="material-icons md-18">people</span>Players
            </a>
          </Link>
          <Link href="/matches">
            <a>
              <span className="material-icons md-18">view_agenda</span>Matches
            </a>
          </Link>
          <Link href="https://www.dota2.com/home">
            <a target="_blank">
              <span className="material-icons md-18">open_in_new</span> Dota 2
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
