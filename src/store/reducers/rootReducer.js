import authReducer from './authReducer'
import projectReducer from './projectReducer'
import werewolfReducer from './werewolfReducer'
import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    werewolf: werewolfReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object
