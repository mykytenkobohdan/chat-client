import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  behaviorSubject = new BehaviorSubject<any>({});

  constructor() {
  }

  authChange(event) {
    this.behaviorSubject.next(event);
  }

  saveUserToLocal(user: User) {
    localStorage.setItem('user', JSON.stringify({
      username: user.username,
      userId: user._id
    }));

    return this;
  }
}
