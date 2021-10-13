import Head from "next/head";
import Image from "next/image";
import heroes from "dotaconstants/build/heroes";
import lore from "dotaconstants/build/hero_lore";

import { getAttributeIcon } from "../../util/hero";
import { Typography } from "@mui/material";

export default function Hero({ hero }) {
  return (
    <>
      <Head>
        <title>{hero.localized_name} overview</title>
        <meta name="description" content="Dota 2 overview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
          <Image
            src={getAttributeIcon(hero.primary_attr)}
            width={45}
            height={60}
          />{" "}
          {hero?.localized_name}
        </div>
        <div>
          <ul>
            <li>{hero.attack_type}</li>
            {hero?.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        </div>
        <div>
          {hero?.description.map((desc, index) => (
						<Typography component="p" key={index}>{desc}</Typography>
          ))}
        </div>
        <Image
          src={`https://steamcdn-a.akamaihd.net/${hero.img}`}
          width={144}
          height={144}
        />
        <div>
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
  let desc;

  if (loreName == "dawnbreaker") desc = [];
  else desc = lore[loreName].split(/\n/g);

  const hero = { ...data, description: desc };
  return {
    props: {
      hero,
    },
  };
}
