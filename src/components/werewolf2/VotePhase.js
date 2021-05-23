import React, { useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";

import { WerewolfContext } from "./WerewolfContextProvider";

export default function VotePhase({ className = "" }) {
  const werewolfContext = useContext(WerewolfContext);
  const { allPlayers, gameController } = werewolfContext;
  const isVoting = gameController.isVoting;
  const handleClick = () => {
    werewolfContext.toggleVotePhase(!isVoting);
  };
  let description = [];
  if (isVoting) {
    description = description.push('Please go to "Votes" tab to vote');
  } else if (allPlayers) {
    const result = _.chain(allPlayers).countBy("vote").sort().value();
    delete result.undefined;
    delete result[0];
    if (Object.keys(result).length) {
      description = Object.keys(result).map(
        (num) => `Player ${num} has ${result[num]} votes.`
      );
    }
  }

  return (
    <>
      <Button
        className={className}
        variant={!isVoting ? "success" : "warning"}
        onClick={handleClick}
      >
        {isVoting ? "End Vote and See Result" : "Start Vote"}
      </Button>
      <div className="mt-2">
        {_.map(description, (desc) => (
          <h5 key={desc}>{desc}</h5>
        ))}
      </div>
    </>
  );
}
