import styles from "./search.module.scss";

export default function SearchBar(props) {
  return (
    <div className={styles.searchbar}>
      <input type="search" className={styles.search} id="search" />
      <button className={styles.button} onClick={props.onClick}>
        Search
      </button>
    </div>
  );
}
