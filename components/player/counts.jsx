import { useCounts } from "../../hooks/usePlayer";
import Spinner from "../spinner";

export default function ProfileCounts({ id }) {
  const { data: counts, isLoading } = useCounts(id);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="block p-6 max-w-sm">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
          {(
            (counts.is_radiant[0].win / counts.is_radiant[0].games) *
            100
          ).toFixed(2)}
          %
        </h5>
        <span className="font-normal text-gray-300">Dire winrate</span>
      </div>
      <div className="block p-6 max-w-sm">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
          {(
            (counts.is_radiant[1].win / counts.is_radiant[1].games) *
            100
          ).toFixed(2)}
          %
        </p>
        <span className="font-normal text-gray-300">Radiant </span>
      </div>
    </>
  );
}
