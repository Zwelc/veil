import React from "react";
import Hero from "./Hero";

function HeroList({ heroes, heroData }) {
  return (
    <div>
      {heroes.map((hero) => (
        <Hero key={hero.hero_id} hero={hero} heroData={heroData} />
      ))}
    </div>
  );
}

export default HeroList;
