import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private userId: string;
  public isCurrentUser: boolean;
  public user: User;
  public oldUser: User;
  public userForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private toastr: ToastrService) {
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

  cancelEdit() {
    this.userForm.patchValue({
      username: this.oldUser.username,
      email: this.oldUser.email
    });
  }

  edit() {
    // "5b56dbd02aec7d7b112306b7"

    if (this.userForm.invalid) {
      this.toastr.error('Form is invalid!');
      return;
    }

    this.user.username = this.userForm.get('username').value;
    this.user.email = this.userForm.get('email').value;

    this.userService.updateUser(this.user)
      .subscribe(u => {
        console.log('New user: ', u);
        this.toastr.success('User updated!');
      }, err => console.log(err));
  }

  initForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe((user: User) => {
        this.oldUser = Object.assign({}, user);
        this.user = user;

        this.initForm();
        console.log(this.oldUser);
      }, err => console.log(err));
  }
}
