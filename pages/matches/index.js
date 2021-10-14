import { useEffect, useState } from "react";
import styles from "../../styles/Matches.module.scss";

function Matches() {
  const baseUrl = "https://api.opendota.com/api/publicMatches";

  const [matches, setMatches] = useState([]);

  useEffect(async () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((results) => setMatches(results));
  }, [matches]);

  return (
    <div>
      <h3>Ongoing Matches</h3>
      <div className={styles.grid}>
        {matches.map((match) => (
          <div className={styles.card} key={match.match_id}>
            <div className={styles.headline}>{match.match_id}</div>
            <div className={styles.average}>MMR: {match.average_mmr}</div>
            <div className={styles.time}>Game Time: {match.game_time}</div>
            <div className={styles.score}>
              Score: {match.radiant_score} : {match.dire_score}{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
