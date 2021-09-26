import styles from "./aside.module.scss";

export default function Aside(props) {
  return <div className={styles.side}>{props.children}</div>;
}
