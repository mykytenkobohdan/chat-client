import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';

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
  public isChangePass = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private appService: AppService,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.userId = params.userId;
      this.getUser(this.userId);
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('user')) {
      return;
    }

    this.isCurrentUser = JSON.parse(localStorage.getItem('user')).userId === this.userId;
  }

  cancelEdit(event) {
    event.preventDefault();

    this.userForm.patchValue({
      username: this.oldUser.username,
      email: this.oldUser.email
    });

    this.user = Object.assign({}, this.oldUser);
  }

  edit(event) {
    event.preventDefault();

    if (this.userForm.invalid) {
      this.toastr.error('Form is invalid!');
      return;
    }

    this.user.username = this.userForm.get('username').value;
    this.user.email = this.userForm.get('email').value;

    if (this.isChangePass) {
      this.user.password = this.userForm.get('newPassword').value;
    }

    this.userService.updateUser(this.user)
      .subscribe((user: User) => {
        this.oldUser = Object.assign({}, user);
        this.appService
          .saveUserToLocal(user)
          .authChange(user);
        this.toastr.success('User updated!');
        this.router.navigate(['/chat']);
      }, err => console.log(err));
  }

  showPassword() {
    this.isChangePass = true;
    this.userForm.addControl('currentPassword', new FormControl('', {
      validators: Validators.required,
      asyncValidators: this.validateCurPassword.bind(this),
      updateOn: 'blur'
    }));
    this.userForm.addControl('newPassword', new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      this.validateNewPassword.bind(this)
    ]));
  }

  resetPassword() {
    this.isChangePass = false;
    this.user.password = this.oldUser.password;
    this.userForm.removeControl('currentPassword');
    this.userForm.removeControl('newPassword');
  }

  initForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email])
    });
  }

  getUser(id) {
    this.userService.getUser(id)
      .subscribe((user: User) => {
        this.oldUser = Object.assign({}, user);
        this.user = user;
        this.isCurrentUser = JSON.parse(localStorage.getItem('user')).userId === this.userId;

        if (this.isCurrentUser) {
          this.initForm();
        }

      }, err => console.log(err));
  }

  validateCurPassword(pass: AbstractControl) {
    return this.userService.checkPassword(pass.value, this.user._id)
      .pipe(
        map(res => res)
      );
  }

  validateNewPassword(pass: FormControl) {
    if (this.isChangePass) {
      return pass.value !== this.userForm.get('currentPassword').value ? null : { newPassword: 'error' };
    }
  }
}
