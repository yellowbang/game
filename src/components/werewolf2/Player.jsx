import React, { useState, useContext, useEffect } from "react";
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
import NightPhase from "./NightPhase";
import { DAY_PHASE } from "./Character";
import Sound from "./Sound";

const Player = (props) => {
  const id = window.location.pathname.split("/")[2];
  const [roleShown, setRoleShown] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("home");
  const werewolfContext = useContext(WerewolfContext);
  const { wolfKill, witchPoison, isVoting, phase } =
    werewolfContext.gameController;
  let { allPlayers } = werewolfContext;

  useEffect(() => {
    if (isVoting) {
      setActiveTabKey("vote");
    }
  }, [isVoting]);

  useEffect(() => {
    const { role } = playerInfo;
    if (role && phase && role.indexOf(phase) !== -1) {
      setActiveTabKey("skill");
    }
  }, [phase]);

  if (!allPlayers) {
    return <div />;
  }

  const playerInfo = { ...allPlayers[id], id };
  allPlayers = _.sortBy(allPlayers, [
    (user) => {
      return user.number;
    },
  ]);
  const { role, username, number, death } = playerInfo;
  const playerCharacter = getClassFromName(role);

  const handleVote = (selectedPlayer) => {
    werewolfContext.setVote(playerInfo, selectedPlayer.number);
  };

  let resultOnNextDay = "";
  if (phase === DAY_PHASE) {
    if (wolfKill === 0 && witchPoison === 0) {
      resultOnNextDay = "It was a peaceful night.";
    } else {
      let dead = [wolfKill, witchPoison];
      dead = _.chain(dead)
        .filter((number) => {
          return number > 0;
        })
        .sort()
        .value();
      resultOnNextDay = `Player ${dead.join(
        " and player "
      )} got killed last night`;
    }
  }

  return (
    <div className={"player-view card my-0 d-flex " + (death ? "bg-dead" : "")}>
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
        <Tabs activeKey={activeTabKey} onSelect={(k) => setActiveTabKey(k)}>
          <Tab eventKey="home" title="Home">
            <div className="d-flex flex-column mb-4 align-items-start">
              <NewGameModal className="mt-3" />
              <div className="separator mt-3" />
              <h5>{resultOnNextDay}</h5>
              <VotePhase />
              <NightPhase className="mt-3" />
            </div>
            <div className="separator" />
            Select Phase <br /> (No need to click, just in case of bugs.)
            <SelectPhases />
          </Tab>
          <Tab eventKey="vote" title="Votes">
            <PlayersList
              handleSelect={handleVote}
              label={"Vote"}
              disabled={playerInfo.death || !isVoting}
            />
          </Tab>
          <Tab eventKey="skill" title="Skill" className="skill-tab">
            <playerCharacter.renderPhase />
          </Tab>
          <Tab eventKey="all" title="All Players" className="all-tab">
            <PlayersList
              handleSelect={werewolfContext.setIsKilled}
              label={"Kill"}
              label2={"Death"}
              keyForLabel2={"death"}
              lastButtonLabel={""}
            />
          </Tab>
        </Tabs>
      </section>
      <Sound />
    </div>
  );
};

export default Player;
