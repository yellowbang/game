import React, { useState, useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getClassFromName } from "./Character";
import "./Werewolf2.css";
import PlayersList from "./PlayersList";
import { WerewolfContext } from "./WerewolfContextProvider";

const Player = (props) => {
  const id = window.location.pathname.split("/")[2];
  const [roleShown, setRoleShown] = useState(false);
  const werewolfContext = useContext(WerewolfContext);
  let { allPlayers } = werewolfContext;

  if (!allPlayers) {
    return <div />;
  }

  const playerInfo = { ...allPlayers[id], id };
  allPlayers = _.sortBy(allPlayers, [
    (user) => {
      return user.number;
    },
  ]);
  const { role, username, number } = playerInfo;
  const playerCharacter = getClassFromName(role);

  const handleVote = (selectedPlayer) => {
    werewolfContext.setVote(playerInfo, selectedPlayer.number);
  };

  return (
    <div className="player-view card my-0 d-flex">
      <section className="player-info p-3 shadow-sm d-flex w-100 align-items-center justify-content-between">
        <div />
        <div>
          <h4 className="m-0">{`${username} (${number})`}</h4>
        </div>
        <Button
          variant="outline-primary"
          className=""
          onClick={() => {
            setRoleShown(!roleShown);
          }}
        >
          {roleShown ? `${role}` : "View Role"}
        </Button>
      </section>
      <section className="all-players shadow-sm p-3">
        <PlayersList handleSelect={handleVote} label={"Vote"} />
      </section>
    </div>
  );
};

export default Player;
