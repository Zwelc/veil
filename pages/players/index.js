import styles from "../../styles/Player.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Main from "../../components/layout/main";
import SearchBar from "../../components/searchbar";

function Players() {
  const baseUrl = "https://api.opendota.com/api/search?q=";

  const [players, setPlayers] = useState([]);

  function handleClick() {
    const query = document.getElementById("search").value;
    fetch(baseUrl + query)
      .then((res) => res.json())
      .then((results) => setPlayers(results));
  }

  return (
    <Main>
      <SearchBar onClick={handleClick} />
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
                <div>Last Seen: {player.last_match_time} </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Main>
  );
}

export default Players;
