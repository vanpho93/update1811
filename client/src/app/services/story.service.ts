import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestWithToken } from './request-with-token.service';

@Injectable()

export class StoryService {
    constructor(private request: RequestWithToken, private store: Store<any>) {}

    createStory(content: string) {
        return this.request.post('/story', { content })
    }

    getAllStory() {
        return this.request.get('/story')
        .then(response => {
            if (!response.success) return;
            this.store.dispatch({ type: 'SET_STORIES', stories: response.stories });
        });
    }

    likeStory(_id) {
        return this.request.post(`/like/${_id}`, {})
        .then(response => {
            if (!response.success) return;
            this.store.dispatch({ type: 'ADD_LIKE', _id });
        });
    }

    createComment(content: string, storyId: string) {
        return this.request.post('/comment', { content, storyId })
        .then(response => {
            if (!response.success) return;
            console.log(response);
            this.store.dispatch({
                type: 'ADD_COMMENT',
                comment: response.comment,
                _id: storyId
            });
        });
    }
}
