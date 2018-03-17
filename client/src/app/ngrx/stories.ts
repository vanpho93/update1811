import { Story } from '../types';

export function storiesReducer(state: Story[] = [], action): Story[] {
    if (action.type === 'SET_STORIES') return action.stories;
    if (action.type === 'ADD_LIKE') {
        return state.map(story => {
            if (story._id !== action._id) return story;
            const me = { _id:'', name: '', email: '' };
            // cho nay chua xong
            return { ...story, fans: [...story.fans, me] };
        });
    }
    if (action.type === 'ADD_COMMENT') {
        return state.map(story => {
            if (story._id !== action._id) return story;
            return { ...story, comments: [...story.comments, action.comment ] };
        });
    }
    return state;
}
