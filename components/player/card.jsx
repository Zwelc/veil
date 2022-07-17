/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";

export default function PlayerCard({ player, path, action }) {
  const router = useRouter();

  const handleSave = () => {
    let players = JSON.parse(localStorage.getItem("id"));
    if (players) {
      if (
        !players.players.find(
          (record) => record.account_id == player.account_id
        )
      ) {
        players.players.push(player);
      }
    } else {
      players = { players: [] };
      players.players.push(player);
    }
    localStorage.setItem("id", JSON.stringify({ players: players.players }));
  };

  const handleView = () => {
    router.push(`/players/${player.account_id}`);
  };

  const handleRemove = () => {
    let savedPlayers = JSON.parse(localStorage.getItem("id"));
    const rest = savedPlayers.players.filter(
      (record) => record.account_id != player.account_id
    );

    localStorage.setItem("id", JSON.stringify({ players: rest }));
    action(rest);
  };
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10 pt-4">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={player.avatarfull}
          alt={player.personaname}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {player.personaname}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last Played: {new Date(player.last_match_time).toLocaleDateString()}
        </span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
          <button
            onClick={handleView}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
          </button>
          {path === "/players" ? (
            <button
              onClick={handleSave}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     component="img"
    //     height="210"
    //     image={player.avatarfull}
    //     alt={player.personaname}
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {player.personaname}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small" onClick={handleView} color="inherit">
    //       View
    //     </Button>
    //     {path === "/players" ? (
    //       <Button size="small" onClick={handleSave} color="inherit">
    //         Save
    //       </Button>
    //     ) : (
    //       <Button size="small" onClick={handleRemove} color="inherit">
    //         Remove
    //       </Button>
    //     )}
    //   </CardActions>
    // </Card>
  );
}
