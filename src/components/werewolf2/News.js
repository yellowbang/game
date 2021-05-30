import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { WerewolfContext } from "./WerewolfContextProvider";
import { DAY_PHASE, WOLF_LADY } from "./Character";

export default function News({ isMc = false }) {
  const werewolfContext = useContext(WerewolfContext);
  const { gameController, setKills, getPlayerByNumber } = werewolfContext;
  const { wolfKill, witchPoison, wolfLadySleep, phase } = gameController;

  const getDeathNumbers = () => {
    let killedIds = [wolfKill, witchPoison];
    const killedPlayers = killedIds.map((num) => getPlayerByNumber(num));
    const wolfLadyIsKilled = _.some(killedPlayers, { role: WOLF_LADY });
    if (wolfLadyIsKilled) {
      killedIds.push(wolfLadySleep);
    }

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

  let newsDetail = "";
  if (isMc) {
    newsDetail = (
      <h4 className="mb-3">
        <div>
          Wolf kills: player <span className="text-info">{wolfKill}</span>
        </div>
        <div>
          Wolf Lady sleeps: player{" "}
          <span className="text-info">{wolfLadySleep}</span>
        </div>
        {witchPoison > 0 && (
          <div>
            witch has given poison: player{" "}
            <span className="text-info">{witchPoison}</span>
          </div>
        )}
        <div className="mt-3 separator" />
      </h4>
    );
  }

  return (
    <h3 className="mb-3">
      {newsDetail}
      {resultOnNextDay}
    </h3>
  );
}
