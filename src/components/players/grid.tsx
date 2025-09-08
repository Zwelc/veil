/* eslint-disable @typescript-eslint/no-explicit-any */
import PlayerCard from "../player-card";
import Grid from "../tiles/grid";
type Props = {
  limit: number;
  loading: boolean;
  data: any[];
};
export default function PlayerGrid({ limit, loading, data = [] }: Props) {
  const skeleton = new Array(24).fill(null);
  return (
    <Grid>
      {loading ? (
        skeleton.map((item, index) => (
          <div key={index} className="tile animate-pulse "></div>
        ))
      ) : data?.length > 0 ? (
        data
          .slice(0, limit)
          .map((player: any) => (
            <PlayerCard player={player} key={player.account_id} />
          ))
      ) : (
        <div className="col-span-2 md:col-span-6">
          Could not find any players
        </div>
      )}
    </Grid>
  );
}
