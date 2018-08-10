import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private host: string = environment.host;
    private url = `${this.host}/authorize`;

    constructor(private http: HttpClient) {
    }

    public login(data) {
        return this.http.post(this.url, data);
    }
}
