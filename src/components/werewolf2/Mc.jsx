import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import "./Werewolf2.css";

import { WerewolfContext } from "./WerewolfContextProvider";
import NewGameModal from "./NewGameModal";
import PlayersList from "./PlayersList";
import SelectPhases from "./SelectPhases";
import { VILLAGER, WOLF, allVirtuousGods, allEvilGods } from "./Character";

export default function Mc() {
  const werewolfContext = useContext(WerewolfContext);
  const [rolesDisplayed, setRolesDisplayed] = useState(false);

  const handleKilled = (user) => {
    werewolfContext.setIsKilled(user);
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
              handleSelect={handleKilled}
              label={"Kill"}
              label2={"Killed"}
              keyForLabel2={"death"}
              lastButtonLabel={"Reveal Roles"}
              rolesDisplayed={rolesDisplayed}
              handleLastButton={toggleRolesDisplayed}
            />
          </Tab>
          <Tab eventKey="select_phases" title="Select Phases">
            <SelectPhases />
          </Tab>
        </Tabs>
      </section>
    </div>
  );
}
