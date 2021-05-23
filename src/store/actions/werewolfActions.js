import { createBrowserHistory } from "history";
import _ from "lodash";

import { WAKE_UP_ORDER } from "../../components/werewolf2/Character";

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
      werewolfUsersStore
        .doc(id)
        .update({ number: numbers[index], role: roles[index], death: false });
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
    gameController.doc(GAME_CONTROLLER).update({ wakeUpRoles });
  };
};

export const setIsKilled = (killedUser) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let werewolfUsersStore = firestore.collection("werewolfUsers");
    werewolfUsersStore.doc(killedUser.id).update({ death: !killedUser.death });
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
    gameController.doc(GAME_CONTROLLER).update({ phase });
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
