export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let projects = firestore.collection('projects');
        projects.get().then(snap => {
            let size = snap.size;
            projects.add({
                ...project,
                gameId: size + 1,
            }).then(() => {
                dispatch({type: 'CREATE_PROJECT_SUCCESS'});
            }).catch(err => {
                dispatch({type: 'CREATE_PROJECT_ERROR'}, err);
            });
        })
    }
};
