export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore();
        let projects = firestore.collection('projects');
        projects.get().then(snap => {
            let total = 0;
            let id = JSON.stringify(snap.size + 1);
            for (let i = 0; i < id.length; i++) {
                total += parseInt(id[i], 10)
            }
            projects.add({
                ...project,
                travel: '',
                gameId: total + id,
            }).then(() => {
                dispatch({type: 'CREATE_PROJECT_SUCCESS'});
                let total = 0;
                let id = JSON.stringify(snap.size + 2);
                for (let i = 0; i < id.length; i++) {
                    total += parseInt(id[i], 10)
                }
                projects.add({
                    ...project,
                    content: '',
                    gameId: total + id,
                })
            }).catch(err => {
                dispatch({type: 'CREATE_PROJECT_ERROR'}, err);
            });
        })
    }
};
