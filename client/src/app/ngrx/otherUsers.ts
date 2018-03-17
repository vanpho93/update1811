import { User } from '../types';

export function otherUsersReducer(state = null, action) {
    if (action.type === 'OTHER_USERS') return action.otherUsers;
    if (action.type === 'SEND_REQUEST') {
        return state.filter(u => u._id !== action._id);
    }
    return state;
}
