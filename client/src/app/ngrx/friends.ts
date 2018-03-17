export function friendsReducer(state = [], action) {
    if (action.type === 'SET_FRIENDS') return action.friends;
    if (action.type === 'ACCEPT_FRIEND') return state.concat(action.friend);
    if (action.type === 'REMOVE_FRIEND') { 
        return state.filter(u => u._id !== action._id);
    }
    return state;
}
