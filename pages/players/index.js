import styles from "../../styles/Player.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Players() {
  const baseUrl = "https://api.opendota.com/api/search?q=";

  const [players, setPlayers] = useState([]);

  async function handleClick() {
    const query = document.getElementById("search").value;
    fetch(baseUrl + query)
      .then((res) => res.json())
      .then((results) => setPlayers(results));
  }

  function Results() {
    return players.map((player) => {
      <Link href={player.account_id} key={player.account_id}>
        <div className={styles.card}>
          <Image src={player.avatarfull} width={80} height={68} />
          {player.personaname}
        </div>
      </Link>;
    });
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.searchbar}>
          <input type="search" className={styles.search} id="search" />
          <button className={styles.button} onClick={() => handleClick()}>
            Search
          </button>
        </div>
        <div className={styles.container}>
          <div className={styles.results}>
            {players.map((player) => (
              <Link
                href={`/players/${player.account_id}`}
                key={player.account_id}
              >
                <div className={styles.card}>
                  <header>
                    <Image src={player.avatarfull} width={215} height={210} />
                  </header>
                  <div className={styles.card_body}>{player.personaname}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Players;
