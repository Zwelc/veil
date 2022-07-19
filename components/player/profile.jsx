/* eslint-disable @next/next/no-img-element */
import usePlayer from "../../hooks/usePlayer";

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
    <div className="">
      <img
        className="w-48 h-48 rounded-full "
        src={player.profile.avatarfull}
        alt={player.profile.personaname}
        layout="fill"
      />
      <div className="text-2xl font-medium text-white text-center">
        {player.profile.personaname}
      </div>
    </div>
  );
}

export default Profile;
