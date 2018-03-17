import { User } from '../types';

export function sentRequestsReducer(state: User[] = [], action) {
    if (action.type === 'SET_SENT_REQUESTS') return action.sentRequests;
    if (action.type === 'SEND_REQUEST') {
        return state.concat(action.friend);
    }
    return state;
}
