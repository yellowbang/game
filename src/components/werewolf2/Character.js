export const VILLAGER = "villager";
export const SEER = "seer";
export const WOLF = "wolf";
export const WAKE_UP_ORDER = [WOLF, SEER];

export class Character {
  constructor(role) {
    console.warn(role);
    this.wakeUpOrder = WAKE_UP_ORDER.findIndex((order) => {
      return order === role;
    });
    console.log(this.wakeUpOrder);
  }
}

class Villager extends Character {
  constructor() {
    super(VILLAGER);
  }
}

export class Seer extends Character {
  constructor() {
    super(SEER);
  }
}

export class Wolf extends Character {
  constructor() {}
}

export const getClassFromName = (role) => {
  if (!role) {
    return new Character();
  } else {
    switch (role.toLowerCase()) {
      case SEER:
        return new Seer();
      case WOLF:
        return new Wolf();
      default:
        return new Character();
    }
  }
};
