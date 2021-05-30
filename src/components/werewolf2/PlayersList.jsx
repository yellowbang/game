import React, { useState, useContext, useCallback } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import "./Werewolf2.css";
import { WerewolfContext } from "./WerewolfContextProvider";

const INVALID_NUMBER = 99999;
const SKIP_ACTION = { number: INVALID_NUMBER };

const PlayersList = (props) => {
  const werewolfContext = useContext(WerewolfContext);
  const {
    isMc,
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

  const deleteUser = useCallback(
    (player) => {
      werewolfContext.deleteUser(player);
    },
    [werewolfContext.allPlayers]
  );

  if (!allPlayers) {
    return <div />;
  }

  const onClickRow = (player) => {
    setSelectedPlayer(player);
    handleSelect && handleSelect(player);
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
        className={
          itemRowClassName + (user === selectedPlayer ? " selected-player" : "")
        }
      >
        {isMc && (
          <div
            className="delete-user text-danger border border-danger rounded-circle text-center mr-2"
            onClick={deleteUser.bind(this, user)}
          >
            X
          </div>
        )}
        <div className="order-number">
          {user.number}{" "}
          {Number.isInteger(user.vote) &&
          user.vote !== INVALID_NUMBER &&
          user.vote !== 0 &&
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

  if (lastButtonLabel !== "") {
    allPlayersRow.push(
      <div key="Skip" className={itemRowClassName + " flex-row-reverse"}>
        <div className="bg-white">
          <Button
            disabled={disabled}
            variant={
              SKIP_ACTION === selectedPlayer ? "secondary" : "outline-secondary"
            }
            onClick={handleLastButton.bind(this, selectedPlayer)}
          >
            {lastButtonLabel}
          </Button>
        </div>
      </div>
    );
  }

  return <div className="player-list-container">{allPlayersRow}</div>;
};

export default PlayersList;
