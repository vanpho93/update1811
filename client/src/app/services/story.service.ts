import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestWithToken } from './request-with-token.service';

@Injectable()

export class StoryService {
    constructor(private request: RequestWithToken, private store: Store<any>) {}

    createStory(content: string) {
        return this.request.post('/story', { content })
    }    
}
