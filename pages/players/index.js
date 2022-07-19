import Spinner from "../../components/spinner";
import PlayerCard from "../../components/player/card";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import { useSearch } from "../../hooks/usePlayer";

function Players() {
  const { search, setSearch } = useContext(SearchContext);

  const { data, isLoading, isError } = useSearch(search);

  if (isError)
    return (
      <div className="h-full flex items-center justify-center">
        failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Spinner />
        <div className="text-xl text-gray-50">
          Try searching for a different player if this persists
        </div>
      </div>
    );
  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        Try searching for a player...
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-2">
      {data.map((player) => (
        <PlayerCard player={player} path="/players" key={player.account_id} />
      ))}
    </div>
  );
}

export default Players;
