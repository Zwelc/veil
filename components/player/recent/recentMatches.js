import MatchRow from "./matchRow";
import styles from "./recentMatches.module.scss";

function RecentMatches(props) {
  const recent = props.recent;
  const heroes = props.heroes;
  const mode = props.mode;
  const lobby = props.lobby;

  return (
    <table className={styles.table}>
      <tbody>
        {recent.map((match) => (
          <MatchRow
            key={match.match_id}
            matches={match}
            heroes={heroes}
            mode={mode}
            lobby={lobby}
          />
        ))}
      </tbody>
    </table>
  );
}

export default RecentMatches;
