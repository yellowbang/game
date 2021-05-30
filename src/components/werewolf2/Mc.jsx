import React, { useContext, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Werewolf2.css";

import { WerewolfContext } from "./WerewolfContextProvider";
import NewGameModal from "./NewGameModal";
import PlayersList from "./PlayersList";
import SelectPhases from "./SelectPhases";
import News from "./News";
import VotePhase from "./VotePhase";
import NightPhase from "./NightPhase";

export default function Mc() {
  const werewolfContext = useContext(WerewolfContext);
  const [rolesDisplayed, setRolesDisplayed] = useState(false);

  const handleKilled = (user) => {
    werewolfContext.toggleIsKilled(user);
  };

  const toggleRolesDisplayed = () => {
    setRolesDisplayed(!rolesDisplayed);
  };

  return (
    <div className="mc-view card my-0 d-flex">
      <section className="header p-3 shadow-sm d-flex w-100 align-items-center justify-content-between">
        <div>
          <h4 className="m-0">Werewolf MC</h4>
        </div>
        <NewGameModal />
      </section>
      <section className="all-players shadow-sm p-3">
        <Tabs defaultActiveKey="roles">
          <Tab eventKey="roles" title="Roles">
            <PlayersList
              isMc
              handleSelect={handleKilled}
              label={"Kill"}
              label2={"Death"}
              keyForLabel2={"death"}
              lastButtonLabel={"Reveal Roles"}
              rolesDisplayed={rolesDisplayed}
              handleLastButton={toggleRolesDisplayed}
            />
          </Tab>
          <Tab eventKey="game" title="Game">
            <div className="w-100 mb-3" />
            <News isMc />
            <VotePhase />
            <NightPhase className="my-3" />
            <div className="separator" />
          </Tab>
          <Tab eventKey="hack" title="Hack">
            <h5 className="mt-3">
              You can modify the game here if something goes wrong
            </h5>
            <div className="separator" />
            <SelectPhases />
            <div className="separator" />
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
