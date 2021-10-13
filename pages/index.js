import Head from "next/head";
import Link from "next/link";
import Main from "../components/layout/main";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import heroes from "dotaconstants/build/heroes.json";

export default function Home({ matches, heroes }) {
  return (
    <>
      <Head>
        <title>Reactive Stats</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Main> */}
			<div>
        <h3>Public Matches</h3>
        <div className={styles.grid}>
          {matches.map((match) => (
            <div className={styles.card} key={match.match_id}>
              <div className={styles.headline}>
                <span className={styles.title}>{match.match_id}</span>
                <span className="material-icons md-24">unfold_more</span>
              </div>
              <div className={styles.average}>MMR: {match.avg_mmr}</div>
              <div className={styles.time}>
                {match.radiant_win ? "Radiant Won" : "Dire Won"}
              </div>
              <hr />
              <div className={styles.score}>
                {match.radiant_team.split(",").map((hero) => {
                  const playerHero = heroes[hero];
                  return (
                    <Image
                      key={playerHero.id}
                      src={`https://steamcdn-a.akamaihd.net/${playerHero.icon}`}
                      width={14}
                      height={16}
                      alt={playerHero.localized_name}
                    />
                  );
                })}{" "}
                VS{" "}
                {match.dire_team.split(",").map((hero) => {
                  const playerHero = heroes[hero];
                  return (
                    <Image
                      key={playerHero.id}
                      src={`https://steamcdn-a.akamaihd.net/${playerHero.icon}`}
                      width={16}
                      height={16}
                      alt={playerHero.localized_name}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
				</div>
      {/* </Main> */}
    </>
  );
}

export async function getServerSideProps() {
  const publicMatches = await fetch(
    "https://api.opendota.com/api/publicMatches"
  );
  const matches = await publicMatches.json();
  console.log(matches[0].radiant_team);
  return { props: { matches, heroes } };
}
