import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  behaviorSubject = new BehaviorSubject<any>({});

  constructor() {
    console.log('use app service');
  }

  authChange(event) {
    this.behaviorSubject.next(event);
  }
}
