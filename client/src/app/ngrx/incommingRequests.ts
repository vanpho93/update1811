export function inCommingRequestsReducer(state = [], action) {
    if (action.type === 'SET_INCOMMING_REQUESTS') return action.incommingRequests;
    if (action.type === 'ACCEPT_FRIEND') return state.filter(u => u._id !== action._id);
    return state;
}
