import React, { useContext } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";

import { WerewolfContext } from "./WerewolfContextProvider";

export default function NightPhase({ className = "" }) {
  const werewolfContext = useContext(WerewolfContext);
  const handleClick = () => {
    werewolfContext.resetNightPhase(
      werewolfContext.gameController.wakeUpRoles[0]
    );
  };

  return (
    <>
      <Button className={className} variant={"success"} onClick={handleClick}>
        Night and Sleep
      </Button>
    </>
  );
}
