import React, { useState, useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import "./Werewolf2.css";
import { WerewolfContext } from "./WerewolfContextProvider";

const INVALID_NUMBER = 99999;
const SKIP_ACTION = { number: INVALID_NUMBER };

const PlayersList = (props) => {
  const werewolfContext = useContext(WerewolfContext);
  const {
    handleSelect,
    label = "Select",
    label2,
    keyForLabel2,
    lastButtonLabel = "Skip",
    handleLastButton = () => {
      onClickRow(SKIP_ACTION);
    },
    disabled,
    rolesDisplayed,
  } = props;
  let { allPlayers, gameController } = werewolfContext;
  const [selectedPlayer, setSelectedPlayer] = useState();
  if (!allPlayers) {
    return <div />;
  }

  const onClickRow = (player) => {
    setSelectedPlayer(player);
    handleSelect(player);
  };

  allPlayers = _.sortBy(allPlayers, [
    "death",
    (user) => {
      return user.number;
    },
  ]);

  const itemRowClassName =
    "player-row w-100 p-2 pt-0 d-flex flex-row align-items-center justify-content-between";
  const allPlayersRow = _.map(allPlayers, (user, id) => {
    let userContainer = {
      opacity: user.death && !keyForLabel2 ? 0.3 : 1,
    };

    let displayedLabel = label;
    if (keyForLabel2 && user[keyForLabel2]) {
      displayedLabel = label2;
    }

    return (
      <div
        id={user.id}
        key={user.username}
        style={userContainer}
        className={itemRowClassName}
      >
        <div className="order-number">
          {user.number}{" "}
          {Number.isInteger(user.vote) &&
          user.vote !== INVALID_NUMBER &&
          !gameController.isVoting
            ? ` => ${user.vote}`
            : ""}
        </div>
        <div className="name">
          {user.username} {rolesDisplayed ? ` (${user.role})` : ""}
        </div>
        <div className="bg-white">
          <Button
            size="sm"
            disabled={(user.death && !keyForLabel2) || disabled}
            variant={
              user === selectedPlayer ? "secondary" : "outline-secondary"
            }
            onClick={() => {
              onClickRow(user);
            }}
          >
            {displayedLabel}
          </Button>
        </div>
      </div>
    );
  });

  allPlayersRow.push(
    <div key="Skip" className={itemRowClassName + " flex-row-reverse"}>
      <div className="bg-white">
        <Button
          disabled={disabled}
          variant={
            SKIP_ACTION === selectedPlayer ? "secondary" : "outline-secondary"
          }
          onClick={handleLastButton}
        >
          {lastButtonLabel}
        </Button>
      </div>
    </div>
  );

  return allPlayersRow;
};

export default PlayersList;
