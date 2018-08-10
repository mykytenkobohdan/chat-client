import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private userId: string;
  public isCurrentUser: boolean;
  public user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.getUser(this.userId);
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      return;
    }

    const savedUserId = JSON.parse(localStorage.getItem('user')).userId;

    this.isCurrentUser = savedUserId === this.userId;
    console.log(this.isCurrentUser);
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe((user: User) => {
        console.log('User: ', user);
        this.user = user;
      }, err => {
        console.log(err);
      });
  }
}
