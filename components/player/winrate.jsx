import { usePlayerWinrate } from "../../hooks/usePlayer";
import Spinner from "../spinner";

export default function ProfileWinrate({ id }) {
  const { data, isLoading } = usePlayerWinrate(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="block p-6 max-w-sm  ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
        {((data.win / (data.win + data.lose)) * 100).toFixed(2)}% 
      </h5>
      <span className="font-normal text-gray-300">Winrate Overall</span>
    </div>
  );
}
