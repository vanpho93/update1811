import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

const SERVER_URL = 'http://localhost:3000';

@Injectable()

export class UserService {
    constructor(private http: Http, private store: Store<any>, private router: Router) {}

    signIn(email: string, password: string) {
        const body = JSON.stringify({ email, password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${SERVER_URL}/signin`, body, { headers })
        .toPromise()
        .then(res => res.json())
        .catch(res => res.json())
        .then(response => {
            if (!response.success) return alert('Đăng nhập không thành công');
            const { token, email, name, phone } = response.user;
            localStorage.setItem('token', token);
            this.store.dispatch({ type: 'SET_USER', user: { email, name, phone } });
            this.router.navigate(['/profile']);
        });
    }

    check() {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', token);
        return this.http.post(`${SERVER_URL}/check`, null, { headers })
        .toPromise()
        .then(res => res.json())
        .catch(res => res.json())
        .then(response => {
            if (!response.success) return localStorage.removeItem('token');
            const { token, email, name, phone } = response.user;
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
