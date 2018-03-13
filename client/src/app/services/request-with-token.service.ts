import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServerResponse } from '../types';

const SERVER_URL = 'http://localhost:3000';

@Injectable()

export class RequestWithToken {
    constructor(private http: Http) {}

    get(subURL: String): Promise<ServerResponse> {
        return this.http.get(`${SERVER_URL}${subURL}`, getHeaders())
        .toPromise()
        .then(res => res.json(), res => res.json());
    }

    post(subURL: String, body: Object): Promise<ServerResponse> {
        return this.http.post(`${SERVER_URL}${subURL}`, JSON.stringify(body), getHeaders())
        .toPromise()
        .then(res => res.json(), res => res.json());
    }

    put(subURL: String, body: Object): Promise<ServerResponse> {
        return this.http.put(`${SERVER_URL}${subURL}`, JSON.stringify(body), getHeaders())
        .toPromise()
        .then(res => res.json(), res => res.json());
    }

    delete(subURL: String, body: Object): Promise<ServerResponse> {
        return this.http.delete(`${SERVER_URL}${subURL}`, getHeaders())
        .toPromise()
        .then(res => res.json(), res => res.json());
    }
}

function getHeaders() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token) headers.append('token', token);
    return { headers };
}
