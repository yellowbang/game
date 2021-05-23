import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { WerewolfContext } from "./WerewolfContextProvider";

export default function SelectPhases() {
  const werewolfContext = useContext(WerewolfContext);

  const phases = werewolfContext.gameController?.wakeUpRoles?.map((role) => {
    return (
      <Button
        key={role}
        className="m-3"
        variant="outline-primary"
        onClick={() => {
          werewolfContext.setPhase(role);
        }}
      >
        {role}
      </Button>
    );
  });

  return <div className="select-phases d-flex flex-columns">{phases}</div>;
}
