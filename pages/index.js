import Head from "next/head";
import Link from "next/link";
import Main from "../components/layout/main";
import styles from "../styles/Home.module.scss";

export default function Home({ matches }) {
  return (
    <>
      <Head>
        <title>Reactive Stats</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <h3>Public Matches</h3>
        <div className={styles.grid}>
          {matches.map((match) => (
            <div className={styles.card} key={match.match_id}>
              <div className={styles.headline}>
                {match.match_id}
                <span className="material-icons md-18">unfold_more</span>
              </div>
              <div className={styles.average}>MMR: {match.avg_mmr}</div>
              <div className={styles.time}>Game Time: {match.duration}</div>
              <div className={styles.score}>
                Score: {match.radiant_score} : {match.dire_score}{" "}
              </div>
            </div>
          ))}
        </div>
      </Main>
    </>
  );
}

export async function getServerSideProps() {
  const publicMatches = await fetch(
    "https://api.opendota.com/api/publicMatches"
  );
  const matches = await publicMatches.json();
  return { props: { matches } };
}
