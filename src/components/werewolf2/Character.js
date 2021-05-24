import React, { useState, useContext, useRef } from "react";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import PlayersList from "./PlayersList";
import { WerewolfContext } from "./WerewolfContextProvider";

export const DAY_PHASE = "day";
export const VILLAGER = "villager";
export const SEER = "seer";
export const WITCH = "witch";
export const HUNTER = "hunter";
export const KNIGHT = "knight";
export const WOLF = "wolf";
export const WOLF_KING = "wolf king";
export const WOLF_LADY = "wolf lady";
export const WOLF_SNOW = "wolf snow";
export const WAKE_UP_ORDER = [WOLF, WOLF_LADY, WITCH, SEER];

export class Character {
  constructor(role) {
    this.wakeUpOrder = WAKE_UP_ORDER.findIndex((order) => {
      return order === role;
    });
    this.characterRole = role;
    this.isWolf = false;
    this.isDefaultCheck = false;
  }
  renderPhase() {
    return <div />;
  }
}

export class Villager extends Character {
  constructor(role) {
    super(role || VILLAGER);
  }
}

export class Seer extends Villager {
  constructor() {
    super(SEER);
    this.isDefaultCheck = true;
  }
  renderPhase() {
    const werewolfContext = useContext(WerewolfContext);
    const { gameController, seerSees } = werewolfContext;
    const disabled =
      gameController.phase !== SEER || gameController.seerHasSeen;
    const seenPlayer = gameController.seerHasSeen;
    let result = "";
    let resultCls = "text-uppercase ";
    if (seenPlayer) {
      const role = getClassFromName(seenPlayer.role);
      if (seenPlayer.role.indexOf("wolf") !== -1 && !role.seerCantSee) {
        result = WOLF;
        resultCls += "text-danger";
      } else {
        result = VILLAGER;
        resultCls += "text-success";
      }
    }

    return (
      <div>
        <PlayersList
          disabled={disabled}
          label={"See"}
          handleSelect={(user) => {
            seerSees(user);
            setNextPhase(werewolfContext, gameController.phase);
          }}
          lastButtonLabel=""
        />
        {seenPlayer && (
          <h3 className="py-3">
            Player {seenPlayer.number} is{" "}
            <span className={resultCls}>{result}</span>{" "}
          </h3>
        )}
      </div>
    );
  }
}

export class Witch extends Villager {
  constructor() {
    super(WITCH);
    this.isDefaultCheck = true;
  }

  renderPhase() {
    const [radioValue, setRadioValue] = useState("nothing");
    const werewolfContext = useContext(WerewolfContext);
    const { gameController, witchHeal, witchPoison } = werewolfContext;
    const poisoned = useRef();

    const radios = [
      {
        name: "Heal",
        value: "heal",
        variant: "success",
        disabled: gameController.witchHasHeal,
      },
      { name: "Poison", value: "poison", variant: "warning" },
      { name: "Nothing", value: "nothing", variant: "secondary" },
    ];

    const handleConfirm = () => {
      if (radioValue === "heal") {
        witchHeal();
      } else if (radioValue === "poison") {
        witchPoison(poisoned.current);
      }
      setNextPhase(werewolfContext, gameController.phase);
    };

    const disabled = gameController.phase !== WITCH;

    return (
      <div className="p-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            disabled={radio.disabled}
            className="mr-3 witch-action-radio"
            type="radio"
            variant={radio.variant}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
        {radioValue === "heal" && (
          <div>
            Player {gameController.wolfKill} has been killed. Will you save it?
          </div>
        )}
        {radioValue === "poison" && (
          <PlayersList
            disabled={disabled}
            label={"Poison"}
            handleSelect={(user) => {
              poisoned.current = user;
            }}
            lastButtonLabel=""
          />
        )}
        <div className="separator mt-2" />
        <Button disabled={disabled} onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    );
  }
}

export class Hunter extends Villager {
  constructor() {
    super(HUNTER);
    this.isDefaultCheck = true;
  }
}

export class Knight extends Villager {
  constructor() {
    super(KNIGHT);
    this.isDefaultCheck = true;
  }
}

export class Wolf extends Character {
  constructor(role = WOLF) {
    super(role);
    this.role = role;
    this.isWolf = true;
  }

  renderPhase() {
    const werewolfContext = useContext(WerewolfContext);
    const { gameController, wolfKill } = werewolfContext;
    return (
      <PlayersList
        disabled={gameController.phase !== WOLF}
        label={"Kill"}
        lastButtonLabel="Confirm Kill"
        handleLastButton={(user) => {
          if (gameController.phase === WOLF) {
            wolfKill(user);
            setNextPhase(werewolfContext, gameController.phase);
          }
        }}
      />
    );
  }
}

export class WolfKing extends Wolf {
  constructor() {
    super(WOLF_KING);
    this.isDefaultCheck = true;
  }
}

export class WolfLady extends Wolf {
  constructor() {
    super(WOLF_LADY);
  }
  renderPhase() {
    const werewolfContext = useContext(WerewolfContext);
    const { gameController, wolfKill, wolfLadySleep } = werewolfContext;
    const action = gameController.phase === WOLF_LADY ? "Sleep" : "Kill";
    return (
      <PlayersList
        disabled={
          gameController.phase !== WOLF && gameController.phase !== WOLF_LADY
        }
        label={action}
        lastButtonLabel={`Confirm ${action}`}
        handleLastButton={(user) => {
          if (gameController.phase === WOLF) {
            wolfKill(user);
            setNextPhase(werewolfContext, gameController.phase);
          } else if (gameController.phase === WOLF_LADY) {
            wolfLadySleep(user);
            setNextPhase(werewolfContext, gameController.phase);
          }
        }}
      />
    );
  }
}

export class WolfSnow extends Wolf {
  constructor() {
    super(WOLF_SNOW);
    this.seerCantSee = true;
  }
}

export const setNextPhase = (werewolfContext, currentPhase) => {
  const wakeUpRoles = werewolfContext.gameController?.wakeUpRoles;
  const nextIndex = wakeUpRoles.indexOf(currentPhase) + 1;
  if (wakeUpRoles.length > nextIndex) {
    werewolfContext.setPhase(wakeUpRoles[nextIndex]);
  } else {
    werewolfContext.setPhase(DAY_PHASE);
  }
};

export const getClassFromName = (role) => {
  if (!role) {
    return new Character();
  } else {
    switch (role.toLowerCase()) {
      case SEER:
        return new Seer();
      case WITCH:
        return new Witch();
      case HUNTER:
        return new Hunter();
      case KNIGHT:
        return new Knight();
      case WOLF:
        return new Wolf();
      case WOLF_KING:
        return new WolfKing();
      case WOLF_LADY:
        return new WolfLady();
      case WOLF_SNOW:
        return new WolfSnow();
      default:
        return new Character();
    }
  }
};

export const allVirtuousGods = [Seer, Witch, Hunter, Knight];
export const allEvilGods = [WolfKing, WolfLady, WolfSnow];
export const allGods = allVirtuousGods.concat(allEvilGods);
