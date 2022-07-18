import useSWR from "swr";
import Spinner from "../../components/spinner";
import PlayerCard from "../../components/player/card";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";

const baseUrl = "https://api.opendota.com/api/search?q=";
const fetcher = (query) => fetch(baseUrl + query).then((res) => res.json());

function Players() {
  const { search, setSearch } = useContext(SearchContext);

  const { data, error } = useSWR(search, fetcher);

  if (error)
    return (
      <div className="h-full flex items-center justify-center">
        failed to load
      </div>
    );
  if (!data)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (data)
    return (
      <div className="grid grid-cols-4 gap-2">
        {data.map((player) => (
          <PlayerCard player={player} path="/players" key={player.account_id} />
        ))}
      </div>
    );
}

export default Players;
