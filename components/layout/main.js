import styles from "./main.module.scss";

export default function Main(props) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>{props.children}</div>
    </div>
  );
}
