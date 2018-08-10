import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.host;
  private url = `${this.host}/users`;

  constructor(private http: HttpClient) { }

  getUser(userId) {
    return this.http.get(`${this.url}/${userId}`);
  }
}
