import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import useSound from "use-sound";
import { WerewolfContext } from "./WerewolfContextProvider";
import { getClassFromName } from "./Character";

const InitTime = moment().valueOf();

export default function Sound() {
  const werewolfContext = useContext(WerewolfContext);
  const [startSoundFile, setStartSoundFile] = useState();
  const [endSoundFile, setEndSoundFile] = useState();
  const [ts, setTs] = useState();
  const [startSound] = useSound(startSoundFile);
  const [endSound] = useSound(endSoundFile);

  useEffect(() => {
    setStartSoundFile(
      getClassFromName(werewolfContext.gameController.phase).startSound
    );
    setEndSoundFile(
      getClassFromName(werewolfContext.gameController.previousPhase).endSound
    );
    setTimeout(() => {
      setTs(Math.random());
    }, 300);
  }, [werewolfContext.gameController.phase]);

  useEffect(() => {
    if (InitTime + 2000 < moment().valueOf()) {
      endSound();
      setTimeout(() => {
        startSound();
      }, 3000);
    }
  }, [ts]);

  return <div />;
}
