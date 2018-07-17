import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private host: string = environment.host;
    private url: string = `${this.host}/messages`;

    constructor(private http: HttpClient) {
    }

    public getMessages() {
        // .map() -> for modification data from server.
        return this.http.get(this.url);
    }

    public sendMessage(message) {
        return this.http.post(this.url, message);
    }
}
