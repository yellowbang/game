import React, { useState, useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { getClassFromName } from "./Character";
import "./Werewolf2.css";
import PlayersList from "./PlayersList";
import SelectPhases from "./SelectPhases";
import { WerewolfContext } from "./WerewolfContextProvider";
import NewGameModal from "./NewGameModal";
import VotePhase from "./VotePhase";

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
        <Tabs defaultActiveKey="home">
          <Tab eventKey="home" title="Home">
            <div className="d-flex flex-column mb-4 align-items-start">
              home
              <NewGameModal className="mt-3" />
              <VotePhase className="mt-3" />
            </div>
            <div className="separator" />
            Select Phase
            <SelectPhases />
          </Tab>
          <Tab eventKey="vote" title="Votes">
            <PlayersList handleSelect={handleVote} label={"Vote"} />
          </Tab>
          <Tab eventKey="skill_phase" title="Skill">
            {playerCharacter.renderPhase?.(werewolfContext)}
          </Tab>
        </Tabs>
      </section>
    </div>
  );
};

export default Player;
