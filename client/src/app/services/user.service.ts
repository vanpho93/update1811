import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RequestWithToken } from './request-with-token.service';

@Injectable()

export class UserService {
    constructor(private request: RequestWithToken, private store: Store<any>, private router: Router) {}

    signIn(email: string, password: string) {
        return this.request.post('/user/signin', { email, password })
        .then(response => {
            if (!response.success) return alert('Đăng nhập không thành công');
            const { token, email, name, phone, stories } = response.user;
            localStorage.setItem('token', token);
            console.log(stories);
            this.store.dispatch({ type: 'SET_USER', user: { email, name, phone } });
            this.router.navigate(['/profile']);
        });
    }

    check() {
        return this.request.post('/user/check', {})
        .then(response => {
            if (!response.success) return localStorage.removeItem('token');
            const { token, email, name, phone, stories } = response.user;
            console.log(stories);
            localStorage.setItem('token', token);
            this.store.dispatch({ type: 'SET_USER', user: { email, name, phone } });
        });
    }

    logOut() {
        localStorage.removeItem('token');
        this.store.dispatch({ type: 'SET_USER', user: null });
        this.router.navigate(['/signin']);
    }
}
