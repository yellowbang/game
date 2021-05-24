import React, { useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";

import { WerewolfContext } from "./WerewolfContextProvider";

export default function VotePhase({ className = "" }) {
  const werewolfContext = useContext(WerewolfContext);
  const { allPlayers, gameController, setIsKilled, getPlayerByNumber } =
    werewolfContext;
  const isVoting = gameController.isVoting;
  const handleClick = () => {
    werewolfContext.toggleVotePhase(!isVoting);
  };
  let description = [];
  let max = 0;
  let maxPlayerNumbers = [];
  let maxPlayer;
  if (isVoting) {
    description = description.push('Please go to "Votes" tab to vote');
  } else if (allPlayers) {
    const result = _.chain(allPlayers).countBy("vote").sort().value();
    delete result.undefined;
    delete result[0];

    if (Object.keys(result).length) {
      description = Object.keys(result).map((num) => {
        const counts = result[num];
        if (counts > max) {
          max = counts;
        }
        return `Player ${num} has ${counts} votes.`;
      });
    }
    _.forEach(result, (count, number) => {
      if (count === max) {
        maxPlayerNumbers.push(number);
      }
    });
    if (maxPlayerNumbers.length === 1) {
      maxPlayer = getPlayerByNumber(maxPlayerNumbers[0]);
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

      {maxPlayer && (
        <>
          <Button
            disabled={maxPlayer.death}
            className={className + " mt-3"}
            variant={"danger"}
            onClick={() => {
              setIsKilled(maxPlayer);
            }}
          >
            Vote out player {maxPlayerNumbers[0]}
          </Button>
          {maxPlayer.death && (
            <h5 className="mt-2">Player {maxPlayer.number} is out</h5>
          )}
        </>
      )}
    </>
  );
}
