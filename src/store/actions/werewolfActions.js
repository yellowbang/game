import { createBrowserHistory } from "history";
import _ from "lodash";

import { DAY_PHASE } from "../../components/werewolf2/Character";
import { WAKE_UP_ORDER, WOLF } from "../../components/werewolf2/Character";

export const history = createBrowserHistory();
export const GAME_CONTROLLER = "1";

export const createWerewolfUser = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsers = firestore.collection("werewolfUsers");
    return werewolfUsers.get().then((snap) => {
      return werewolfUsers.add(user).then((doc) => {
        return doc.id;
      });
    });
  };
};

export const startGame = (werewolfUsers, roles) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const werewolfUsersStore = firestore.collection("werewolfUsers");
    let numbers = Array.from(
      { length: Object.keys(werewolfUsers).length },
      (_, index) => index + 1
    );
    numbers = _.shuffle(numbers);
    roles = _.shuffle(roles);
    let index = 0;
    _.forEach(werewolfUsers, (user, id) => {
      werewolfUsersStore.doc(id).update({
        number: numbers[index],
        role: roles[index],
        death: false,
        vote: 0,
      });
      index++;
    });
    const gameController = getGameControllerStore(getFirestore);
    const wakeUpRoles = _.chain(WAKE_UP_ORDER)
      .filter((wakeUpRole) => {
        return roles.indexOf(wakeUpRole) !== -1;
      })
      .unshift("wolf")
      .uniq()
      .value();
    gameController.doc(GAME_CONTROLLER).update({
      wakeUpRoles,
      isVoting: false,
      previousPhase: "",
      phase: "",
      seerHasSeen: false,
      witchHasHeal: false,
      witchPoison: 0,
      wolfKill: 0,
      wolfLadySleep: 0,
    });
  };
};

export const toggleIsKilled = (killedUser) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    werewolfUsersStore
      .doc(killedUser.id)
      .update({ death: !killedUser.death, vote: 0 });
  };
};

export const setKills = (killedUserIds) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    killedUserIds.forEach((id) => {
      werewolfUsersStore.doc(id).update({ death: true, vote: 0 });
    });
  };
};

export const setIsKilled = (killedUser) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    werewolfUsersStore
      .doc(killedUser.id)
      .update({ death: !killedUser.death, vote: 0 });
  };
};

export const deleteUser = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    werewolfUsersStore.doc(user.id).delete();
  };
};

export const setVote = (user, vote) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    werewolfUsersStore.doc(user.id).update({ vote });
  };
};

const getGameControllerStore = (getFirestore) => {
  const firestore = getFirestore();
  return firestore.collection("werewolfGameController");
};

export const toggleVotePhase = (isVoting) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController.doc(GAME_CONTROLLER).update({ isVoting });
  };
};

export const setPhase = (phase) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    const previousPhase =
      getState().firestore.data.werewolfGameController[GAME_CONTROLLER].phase;
    gameController.doc(GAME_CONTROLLER).update({ phase, previousPhase });
  };
};

export const resetNightPhase = (phase = WOLF) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController
      .doc(GAME_CONTROLLER)
      .update({ phase, seerHasSeen: false, previousPhase: DAY_PHASE });
  };
};

export const wolfKill = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController.doc(GAME_CONTROLLER).update({ wolfKill: user.number });
  };
};

export const wolfLadySleep = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController.doc(GAME_CONTROLLER).update({ wolfLadySleep: user.number });
  };
};

export const witchHeal = () => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController
      .doc(GAME_CONTROLLER)
      .update({ wolfKill: 0, witchHasHeal: true });
  };
};

export const witchPoison = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController.doc(GAME_CONTROLLER).update({ witchPoison: user.number });
  };
};

export const seerSees = (user) => {
  return (dispatch, getState, { getFirestore }) => {
    const gameController = getGameControllerStore(getFirestore);
    gameController.doc(GAME_CONTROLLER).update({ seerHasSeen: user });
  };
};
