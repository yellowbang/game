const initState = {}

const werewolfReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_WEREWOLF_USER_SUCCESS':
            console.log('create werewolf user success');
            return state;
        case 'CREATE_WEREWOLF_USER_ERROR':
            console.log('create werewolf user error');
            return state;
        default:
            return state;
    }
};

export default werewolfReducer;
