import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, User } from '../types';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  friends: Observable<User[]>;
  sentRequests: Observable<User[]>;
  incommingRequests: Observable<User[]>;
  otherUsers: Observable<User[]>;
  constructor(private store: Store<AppState>, private friendService: FriendService) {}

  ngOnInit() {
    this.friends = this.store.select('friends');
    this.incommingRequests = this.store.select('incommingRequests');
    this.sentRequests = this.store.select('sentRequests');
    this.otherUsers = this.store.select('otherUsers')
  }
  
  addFriend(_id: string) {
    this.friendService.addFriend(_id);
  }

  acceptFriend(_id: string) {
    this.friendService.acceptFriend(_id);
  }

  removeFriend(_id: string) {
    this.friendService.removeFriend(_id);
  }
}
