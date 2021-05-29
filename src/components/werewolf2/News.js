import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { WerewolfContext } from "./WerewolfContextProvider";
import { DAY_PHASE } from "./Character";

export default function News() {
  const werewolfContext = useContext(WerewolfContext);
  const { gameController, setKills, getPlayerByNumber } = werewolfContext;
  const { wolfKill, witchPoison, phase } = gameController;

  const getDeathNumbers = () => {
    let killedIds = [wolfKill, witchPoison];
    return _.chain(killedIds)
      .filter((number) => {
        return number > 0;
      })
      .uniq()
      .sort()
      .value();
  };

  useEffect(() => {
    if (phase === DAY_PHASE) {
      const numbers = getDeathNumbers();
      const killedPlayers = numbers.map((num) => getPlayerByNumber(num));
      setKills(killedPlayers);
    }
  }, [phase]);

  let resultOnNextDay = "";
  if (phase === DAY_PHASE) {
    if (wolfKill === 0 && witchPoison === 0) {
      resultOnNextDay = "It was a peaceful night.";
    } else {
      const deathIds = getDeathNumbers();
      resultOnNextDay = `Player ${deathIds.join(
        " and player "
      )} got killed last night`;
    }
  }

  return <h3 className="mb-3">{resultOnNextDay}</h3>;
}
