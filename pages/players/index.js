import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../components/spinner";
import PlayerCard from "../../components/player/card";

const baseUrl = "https://api.opendota.com/api/search?q=";
const fetcher = (query) => fetch(baseUrl + query).then((res) => res.json());

function Players() {
  const router = useRouter();
  const { q } = router.query;
  const { data, error } = useSWR(q, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;
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
