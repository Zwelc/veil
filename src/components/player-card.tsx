"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PlayerCard({ player }: { player: any }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  return (
    <div className="tile flex items-center p-4 space-x-6 ">
      <section className="flex items-center p-6 space-x-6 ">
        <div className=" w-24 h-24 rounded-full">
          <Image
            className="w-24 h-24 rounded-full"
            src={player.avatarfull}
            alt={player.personaname}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{player.personaname}</div>

          <p className="text-sm">
            Last Played:{" "}
            {player.last_match_time
              ? new Date(player.last_match_time).toLocaleDateString()
              : "Undisclosed"}
          </p>
          <div className="flex mt-4 space-x-3 lg:mt-6">
            <button
              onClick={handleView}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center  bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
            >
              See More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
