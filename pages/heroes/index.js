import Main from "../../components/layout/main";
import Image from "next/image";
import Link from "next/link";
import heroes from "dotaconstants/build/heroes.json";
import styles from "./Hero.module.scss";

export default function Heroes({ heroes, info }) {
  return (
    <>
      <Main>
        <div className={styles.grid}>
          {heroes?.map((hero) => {
            const heroInfo = info[hero.id];
            return (
              <Link key={hero.id} href={`/heroes/${hero.id}`}>
                <div>
                  <Image
                    src={`https://steamcdn-a.akamaihd.net/${heroInfo.img}`}
                    width={128}
                    height={80}
                  />
                  {/* {hero.localized_name} */}
                </div>
              </Link>
            );
          })}
        </div>
      </Main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.opendota.com/api/heroes");
  const heroesArr = await res.json();
  return {
    props: {
      heroes: heroesArr,
      info: heroes,
    },
  };
}
