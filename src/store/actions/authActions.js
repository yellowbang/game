export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        });

    }
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'})
        });
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {
            let users = firestore.collection('users');
            users.get().then(snap => {
                users.doc(resp.user.uid).set({
                    name: newUser.name,
                    dream: newUser.dream,
                    initials: newUser.name[0],
                    gameId: snap.size + 1,
                });
            });
        }).then(() => {
            dispatch({type: 'SIGNUP_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERROR', err});
        });
    }
};
