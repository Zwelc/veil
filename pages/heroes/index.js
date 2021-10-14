import Image from "next/image";
import Link from "next/link";
import heroes from "dotaconstants/build/heroes.json";
import { Box } from "@mui/system";
export default function Heroes({ heroes, info }) {
  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', mt: 3, gap: 2 }}>
			{heroes?.map((hero) => {
					const heroInfo = info[hero.id];
					return (
						<Link key={hero.id} href={`/heroes/${hero.id}`}>
						<a>
							<Image
								src={`https://steamcdn-a.akamaihd.net/${heroInfo.img}`}
								width={256}
								height={144}
								alt={hero.localized_name}
							/>
							</a>
					</Link>
				)})}
			</Box>
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
