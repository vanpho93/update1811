import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from './services/user.service';
import { AppState } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  checked: Observable<boolean>;

  constructor(private store: Store<AppState>, private userService: UserService) {
    this.checked = this.store.select('checked');
  }

  ngOnInit() {
    this.userService.check()
    .then(response => {
      this.store.dispatch({ type: 'CHECKED' });
    });
  }

  get isSignedIn() { return !!localStorage.getItem('token'); }

  logOut() { this.userService.logOut(); }
}
