export function Profile(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={player.profile.avatarfull} />
        <div className={styles.name}>{player.profile.personaname}</div>
      </div>
      <hr />
      <div className={styles.right}>Rank: {getRank(player.rank_tier)}</div>
      <div>Wins: {wl.win}</div>
      <div>Losses: {wl.lose}</div>
      <hr />
      <div>Winrate: {((wl.win / (wl.win + wl.lose)) * 100).toFixed(2)}% </div>
      <div>
        Dire:{" "}
        {(
          (counts.is_radiant[0].win / counts.is_radiant[0].games) *
          100
        ).toFixed(2)}
        %
      </div>
      <div>
        Radiant:{" "}
        {(
          (counts.is_radiant[1].win / counts.is_radiant[1].games) *
          100
        ).toFixed(2)}
        %
      </div>
    </div>
  );
}
