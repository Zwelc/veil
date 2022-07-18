import usePlayer from "../../hooks/usePlayer";
import { getRank } from "../../lib/ranks";

export default function Rank({ id }) {
  const { player, isLoading } = usePlayer(id);

  if (isLoading) return <div>loading...</div>;

  const rank = getRank(player.rank_tier);
  return (
    <div className="flex flex-col justify-between mb-6">
      <div className="mb-2 text-2xl font-bold tracking-tight text-gray-300 w-full ">
        {rank.alt}
      </div>
      <div className="relative w-full h-24">
        <img
          className="h-24 absolute top-0 z-10"
          src={rank.tier}
          alt={rank.alt}
        />
        <img className="h-24 absolute z-0" src={rank.rank} alt={rank.alt} />
      </div>
    </div>
  );
}
