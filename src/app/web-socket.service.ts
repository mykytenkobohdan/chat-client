import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Message} from './chat/chat.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;
  private host = environment.host;

  constructor() {
    this.socket = io(this.host);
  }

  public initSocket(): void {
    this.socket = io(this.host);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
