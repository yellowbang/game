import {createBrowserHistory} from "history";
import _ from "lodash";

export const history = createBrowserHistory();

export const createWerewolfUser = (user) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let werewolfUsers = firestore.collection('werewolfUsers');
        return werewolfUsers.get().then(snap => {
            return werewolfUsers.add(user).then((doc) => {
                return doc.id;
            })
        })
    }
};

export const startGame = (werewolfUsers, roles) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let werewolfUsersStore = firestore.collection('werewolfUsers');
        let numbers = Array.from({length: Object.keys(werewolfUsers).length}, (_, index) => index + 1);
        numbers = _.shuffle(numbers);
        roles = _.shuffle(roles);
        let index = 0;
        _.forEach(werewolfUsers, (user, id) => {
            werewolfUsersStore.doc(id).update({number: numbers[index], role: roles[index], death: false});
            index++
        });
    }
};

export const setIsKilled = (killedUser) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let werewolfUsersStore = firestore.collection('werewolfUsers');
        werewolfUsersStore.doc(killedUser.id).update({death: !killedUser.death});
    }
};

export const deleteUser = (user) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let werewolfUsersStore = firestore.collection('werewolfUsers');
        werewolfUsersStore.doc(user.id).delete();
    }
};
