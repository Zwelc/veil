import { useState } from "react";
import styles from "./search.module.scss";

export default function SearchBar(props) {
  const [inputValue, setInputValue] = useState("");

  function handleFormChange(e) {
    setInputValue(e.target.value);
  }
  return (
    <div className={styles.input_wrapper}>
      <input
        type="search"
        className={styles.input}
        id="search"
        onChange={(e) => handleFormChange(e)}
        placeholder="Search..."
        value={inputValue}
        spellCheck={false}
      />
      <span className={styles.input_highlight}>
        {inputValue.replace(/ /g, "\u00a0")}
      </span>
      <button className={styles.button} onClick={props.onClick}>
        Search
      </button>
    </div>
  );
}
