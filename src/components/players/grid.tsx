import PlayerCard from "../player-card";

type Props = {
  loading: boolean;
  data: any[];
};
export default function PlayerGrid({ loading, data = [] }: Props) {
  const skeleton = new Array(24).fill(null);
  return (
    <div className="grid grid-cols-2 md:grid-cols-8 gap-4  ">
      {loading ? (
        skeleton.map((item, index) => (
          <div key={index} className="tile animate-pulse "></div>
        ))
      ) : data?.length > 0 ? (
        data
          .slice(0, 16)
          .map((player: any) => (
            <PlayerCard player={player} key={player.account_id} />
          ))
      ) : (
        <div className="col-span-2 md:col-span-8">
          Could not find any players
        </div>
      )}
    </div>
  );
}
