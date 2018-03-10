import { Action } from '@ngrx/store';

export function checkedReducer(state = false, action: Action) {
    if (action.type === 'CHECKED') return true;
    return state;
}
