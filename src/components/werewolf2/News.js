import React, { useContext } from "react";
import _ from "lodash";
import { WerewolfContext } from "./WerewolfContextProvider";
import { DAY_PHASE } from "./Character";

export default function News() {
  const werewolfContext = useContext(WerewolfContext);
  const { wolfKill, witchPoison, phase } = werewolfContext.gameController;

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

  return <h3 className="mb-3">{resultOnNextDay}</h3>;
}
