export function storiesReducer(state = [], action) {
    if (action.type === 'SET_STORIES') return action.stories;
    return state;
}
