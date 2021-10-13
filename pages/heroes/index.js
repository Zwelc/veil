import Main from "../../components/layout/main";
import Image from "next/image";
import Link from "next/link";
import heroes from "dotaconstants/build/heroes.json";
import { ImageList, ImageListItem } from "@mui/material";

export default function Heroes({ heroes, info }) {
  return (
    <>
      {/* <Main> */}
			<ImageList cols={5} rowHeight={144}>
				{heroes?.map((hero) => {
					const heroInfo = info[hero.id];
					return (
						<Link key={hero.id} href={`/heroes/${hero.id}`}>
						<a>
						<ImageListItem>
							<Image
								src={`https://cdn.cloudflare.steamstatic.com${heroInfo.img}`}
								width={256}
								height={144}
								alt={hero.localized_name}
							/>
							</ImageListItem>
							</a>
					</Link>
				)})}
			</ImageList>
      {/* </Main> */}
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
