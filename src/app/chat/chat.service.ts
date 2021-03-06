import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private host: string = environment.host;
    private url = `${this.host}/messages`;

    constructor(private http: HttpClient) {
    }

    public getMessages() {
        // .map() -> for modification data from server.
        return this.http.get(this.url);
    }

    public removeMessage(messageId: string) {
        const id = { id: messageId };

        return this.http.delete(this.url, { params: id });
    }
}
