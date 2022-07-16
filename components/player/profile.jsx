/* eslint-disable @next/next/no-img-element */
import usePlayer from "../../hooks/usePlayer";

import { getRank } from "../../lib/ranks";
function Profile({ id }) {
  const { player, isLoading } = usePlayer(id);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full relative bg-gray-500 animate-pulse"></div>
        <div className=" space-y-1 font-medium text-2xl text-white">
          <div className="h-6 w-full bg-gray-500 animate-pulse"></div>
          <div className="h-6 w-full bg-gray-500 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-24 h-24 rounded-full relative"
        src={player.profile.avatarfull}
        alt={player.profile.personaname}
        layout="fill"
      />
      <div className=" space-y-1 font-medium text-2xl text-white">
        <div>{player.profile.personaname}</div>
        <div>{getRank(player.rank_tier)}</div>
      </div>
    </div>
  );
}

export default Profile;
