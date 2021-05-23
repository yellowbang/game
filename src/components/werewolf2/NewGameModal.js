import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import { WerewolfContext } from "./WerewolfContextProvider";
import PlayersList from "./PlayersList";
import SelectPhases from "./SelectPhases";
import { VILLAGER, WOLF, allVirtuousGods, allEvilGods } from "./Character";

const renderCheckbox = (character, handleCheck = () => {}) => {
  const { isDefaultCheck, characterRole, isWolf } = character;

  return (
    <Col key={characterRole} xs={6} lmd={3}>
      <Form.Group className="d-flex align-items-center">
        <Form.Check
          className="px-1"
          size="lg"
          type="checkbox"
          defaultChecked={isDefaultCheck}
          name={characterRole}
          id={characterRole}
          onChange={handleCheck}
          label={characterRole}
          data-is-wolf={isWolf}
        />
      </Form.Group>
    </Col>
  );
};

export default function NewGameModal(props) {
  const [newGameModalShown, setNewGameModalShown] = useState(false);
  const werewolfContext = useContext(WerewolfContext);
  const { allPlayers } = werewolfContext;
  let initNumberOfGods = 0;
  const evilGods = allEvilGods.map((god) => {
    return new god();
  });
  const virtuousGods = allVirtuousGods.map((God) => {
    const god = new God();
    if (god.isDefaultCheck) {
      initNumberOfGods++;
    }
    return god;
  });
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [numberOfWolfs, setNumberOfWolfs] = useState(3);
  const [numberOfGods, setNumberOfGods] = useState(initNumberOfGods);
  const [numberOfVillagers, setNumberOfVillagers] = useState(0);

  const handleWolfsNumberChange = (e) => {
    const wolfsNumber = parseInt(e.currentTarget.value, 10);
    setNumberOfWolfs(wolfsNumber || "");
  };

  const handleGodChange = (e) => {
    if (e.currentTarget.checked) {
      setNumberOfGods(numberOfGods + 1);
    } else {
      setNumberOfGods(numberOfGods - 1);
    }
  };

  useEffect(() => {
    if (allPlayers) {
      setNumberOfPlayers(Object.keys(allPlayers).length);
    }
  }, [werewolfContext]);

  useEffect(() => {
    if (numberOfPlayers)
      setNumberOfVillagers(numberOfPlayers - numberOfGods - numberOfWolfs);
  }, [numberOfPlayers, numberOfGods, numberOfWolfs]);

  const startNewGame = (e) => {
    e.preventDefault();
    let roles = [];
    const formElements = e.currentTarget.elements;
    let numberOfWolfs = parseInt(formElements.numberOfWolfs.value, 10);
    let numberOfVillagers = parseInt(formElements.numberOfVillagers.value, 10);

    [...formElements].forEach((field) => {
      if (field.type === "checkbox") {
        if (field.checked) {
          roles.push(field.name);
          if (field.dataset.isWolf === "true") {
            numberOfWolfs--;
          }
        }
      }
    });
    for (let i = 0; i < numberOfWolfs; i++) {
      roles.push(WOLF);
    }
    for (let i = 0; i < numberOfVillagers; i++) {
      roles.push(VILLAGER);
    }
    werewolfContext.startGame(werewolfContext.allPlayers, roles);
    setNewGameModalShown(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setNewGameModalShown(!newGameModalShown);
        }}
      >
        New Game
      </Button>
      <Modal
        backdrop="static"
        className="new-game-modal"
        show={newGameModalShown}
        onHide={() => {
          setNewGameModalShown(false);
        }}
        centered
      >
        <Modal.Body className={"new-game-modal-body"}>
          <h4 className="text-center">{numberOfPlayers} Players</h4>
          <Form className="mt-3" onSubmit={startNewGame}>
            <Form.Group controlId="numberOfWolfs">
              <Form.Label>Number of Wolfs</Form.Label>
              <Form.Control
                name="numberOfWolfs"
                type="number"
                value={numberOfWolfs}
                onChange={handleWolfsNumberChange}
              />
            </Form.Group>
            <Container>
              <Row>
                {evilGods.map((god) => {
                  return renderCheckbox(god);
                })}
              </Row>
            </Container>
            <div className="separator" />
            <Container>
              <Row>
                {virtuousGods.map((god) => {
                  return renderCheckbox(god, handleGodChange);
                })}{" "}
              </Row>
            </Container>

            <Form.Group controlId="numberOfVillagers">
              <Form.Label>Number of Villagers</Form.Label>
              <Form.Control
                name="numberOfVillagers"
                disabled
                type="number"
                value={numberOfVillagers}
              />
            </Form.Group>
            <div className="new-game-modal-footer bg-white float-right">
              <Button
                variant="secondary"
                onClick={() => {
                  setNewGameModalShown(false);
                }}
              >
                Cancel
              </Button>
              <Button className="ml-3" variant="primary" type="submit">
                Start
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
