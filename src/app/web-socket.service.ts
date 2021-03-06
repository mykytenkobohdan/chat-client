import {Injectable, NgZone} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Message} from './chat/chat.model';

export enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;
  private host = environment.host;

  constructor(private ngZone: NgZone) {
  }

  public initSocket(): void {
    this.ngZone.runOutsideAngular(() => {
      this.socket = io(this.host);
    });
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public update(message: Message): void {
    this.socket.emit('update-message', message);
  }

  public onCreateMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  public onUpdateMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('update-message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  public onRemoveMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('remove-message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      console.log('socket', event);
      this.socket.on(event, () => observer.next());
    });
  }
}

