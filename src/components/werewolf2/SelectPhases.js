import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { WerewolfContext } from "./WerewolfContextProvider";

export default function SelectPhases() {
  const werewolfContext = useContext(WerewolfContext);

  const phases = werewolfContext.gameController?.wakeUpRoles?.map((role) => {
    return (
      <Button
        key={role}
        className="my-3 mr-3"
        variant="outline-primary"
        onClick={() => {
          werewolfContext.setPhase(role);
        }}
      >
        {role}
      </Button>
    );
  });

  return (
    <div className="">
      <div>
        Set Phase <br /> (Force to jump to the phase)
      </div>
      {phases}
    </div>
  );
}
