import React from "react";
import Match from "./Match";

function MatchList({ matches, heroes }) {
  return (
    <div>
      {matches.map((match) => (
        <Match key={match.match_id} match={match} heroes={heroes} />
      ))}
    </div>
  );
}

export default MatchList;
