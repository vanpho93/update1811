import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RequestWithToken } from './request-with-token.service';

@Injectable()

export class FriendService {
    constructor(private request: RequestWithToken, private store: Store<any>) {}

    getAllUsers() {
        return this.request.get('/friend')
        .then(response => {
            if (!response.success) return;
            const { friends, sentRequests, incommingRequests, otherUsers } = response.users;
            // console.log(friends, sentRequests, incommingRequests, others);
            this.store.dispatch({ type: 'SET_FRIENDS', friends });
            this.store.dispatch({ type: 'SET_SENT_REQUESTS', sentRequests });
            this.store.dispatch({ type: 'SET_INCOMMING_REQUESTS', incommingRequests });
            this.store.dispatch({ type: 'OTHER_USERS', otherUsers });
        });
    }

    addFriend(idFriend: string) {
        this.request.post('/friend/request', { idFriend })
        .then(response => {
            const { success, friend } = response;
            if (!success) return;
            // console.log(response);
            this.store.dispatch({ type: 'SEND_REQUEST', _id: idFriend, friend });
        })
        .catch(error => console.log(error));
    }

    acceptFriend(idFriend: string) {
        this.request.post('/friend/accept', { idFriend })
        .then(response => {
            const { success, friend } = response;
            if (!success) return;
            // console.log(response);
            this.store.dispatch({ type: 'ACCEPT_FRIEND', _id: idFriend, friend });
        })
        .catch(error => console.log(error));
    }

    removeFriend(idFriend: string) {
        this.request.delete(`/friend/${idFriend}`, {})
        .then(response => {
            const { success, friend } = response;
            if (!success) return;
            // console.log(response);
            this.store.dispatch({ type: 'REMOVE_FRIEND', _id: idFriend, friend });
        })
        .catch(error => console.log(error));
    }
}
