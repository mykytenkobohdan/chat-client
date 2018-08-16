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

  updateUser(user) {
    return this.http.put(this.url, user);
  }

  checkPassword(newPassword, userId) {
    const data = {
      newPassword,
      userId
    };

    return this.http.post(`${this.url}/check-pass`, data);
  }
}
