import React from "react";
import _ from "lodash";
import PlayersList from "./PlayersList";

export const VILLAGER = "villager";
export const SEER = "seer";
export const WITCH = "witch";
export const HUNTER = "hunter";
export const KNIGHT = "knight";
export const WOLF = "wolf";
export const WOLF_KING = "wolf king";
export const WOLF_LADY = "wolf lady";
export const WOLF_SNOW = "wolf snow";
export const WAKE_UP_ORDER = [WOLF, WOLF_LADY, SEER];

export class Character {
  constructor(role) {
    this.wakeUpOrder = WAKE_UP_ORDER.findIndex((order) => {
      return order === role;
    });
    this.characterRole = role;
    this.isWolf = false;
    this.isDefaultCheck = false;
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
}

export class Witch extends Villager {
  constructor() {
    super(WITCH);
    this.isDefaultCheck = true;
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

  renderPhase(werewolfContext) {
    const { gameController } = werewolfContext;
    return (
      <PlayersList
        disabled={gameController.phase !== WOLF}
        label={"Kill"}
        lastButtonLabel="Confirm Kill"
        handleLastButton={(user) => {
          if (gameController.phase === WOLF) {
            werewolfContext.wolfKill(user);
            const nextRole = getNextPhase(
              werewolfContext,
              gameController.phase
            );
            if (nextRole) werewolfContext.setPhase(nextRole);
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
  renderPhase(werewolfContext) {
    const { gameController } = werewolfContext;
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
            werewolfContext.wolfKill(user);
            const nextRole = getNextPhase(
              werewolfContext,
              gameController.phase
            );
            if (nextRole) werewolfContext.setPhase(nextRole);
          } else if (gameController.phase === WOLF_LADY) {
            werewolfContext.wolfLadySleep(user);
            const nextRole = getNextPhase(
              werewolfContext,
              gameController.phase
            );
            if (nextRole) werewolfContext.setPhase(nextRole);
          }
        }}
      />
    );
  }
}

export class WolfSnow extends Wolf {
  constructor() {
    super(WOLF_SNOW);
  }
}

export const getNextPhase = (werewolfContext, currentPhase) => {
  const wakeUpRoles = werewolfContext.gameController?.wakeUpRoles;
  const nextIndex = wakeUpRoles.indexOf(currentPhase) + 1;
  if (wakeUpRoles.length > nextIndex) {
    return wakeUpRoles[nextIndex];
  }
  return;
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
