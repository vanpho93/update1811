export function friendsReducer(state = [], action) {
    if (action.type === 'SET_FRIENDS') return action.friends;
    if (action.type === 'ACCEPT_FRIEND') return state.concat(action.friend);
    return state;
}
