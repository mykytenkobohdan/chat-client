import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    private host: string = environment.host;
    private url: string = `${this.host}/users`;

    constructor(private http: HttpClient) {
    }

    public registration(user) {
        // resp is of type `Observable<HttpResponse<Config>>`
        return this.http.post(this.url, user);
    }
}
