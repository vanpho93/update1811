export function userReducer(state = null, action) {
    if (action.type === 'SET_USER') return action.user;
    return state;
}
