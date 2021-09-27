import Head from "next/head";
import Image from "next/image";

import Main from "../../components/layout/main";

import heroes from "dotaconstants/build/heroes";
import lore from "dotaconstants/build/hero_lore";
import styles from "./Hero.module.scss";

export default function Hero({ hero }) {
  return (
    <>
      <Head>
        <title>{hero.localized_name}</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Image
          src={`https://steamcdn-a.akamaihd.net/${hero.img}`}
          width={128}
          height={80}
        />
        <div className={styles.title}>{hero?.localized_name}</div>
        <div className={styles.roles}>
          <ul>
            {hero?.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
        <div className={styles.lore}>
          {hero?.description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </div>
        <div className={styles.stats}>
          <div>Base Health: {hero?.base_health}</div>
          <div>Base Health Regen: {hero?.base_health_regen}</div>
          <div>Base Mana: {hero?.base_mana}</div>
          <div>Base Mana Regen: {hero?.base_mana_regen}</div>
          <div>Base Armor: {hero?.base_armor}</div>
          <div>Base Magic Resistance: {hero?.base_mr}</div>
          <div>
            Base Attack: {hero?.base_attack_min} - {hero?.base_attack_max}
          </div>
          <div>Attack Range: {hero?.attack_range}</div>
          <div>Projectile Speed: {hero?.projectile_speed}</div>
          <div>Movement Speed: {hero?.move_speed}</div>
        </div>
      </Main>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://api.opendota.com/api/heroes");
  const heroes = await res.json();

  let paths = heroes.map((hero) => {
    return `/heroes/${hero.id}`;
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = heroes[params.hero];
  const loreName = data.name.replace(/npc_dota_hero_/, "");
  let desc = lore[loreName].split(/\n/g);

  if (loreName == "dawnbreaker") desc = [];

  const hero = { ...data, description: desc };
  return {
    props: {
      hero,
    },
  };
}
