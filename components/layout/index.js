import Sidebar from "./sidebar";
import styles from "../../styles/wrapper.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
