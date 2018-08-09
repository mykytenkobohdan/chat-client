import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public authForm: FormGroup;
    public loginError = false;
    @Output() isAuth: EventEmitter<User> = new EventEmitter;

    constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.authForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    public login(): void {
        this.authService
            .login(this.authForm.value)
            .subscribe((user: User) => {
                console.log(user);

                if (user.error) {
                    this.loginError = true;
                    this.toastr.error(user.errorMessage);
                } else {
                    this.loginError = false;
                    this.isAuth.emit(user);

                    localStorage.setItem('user', JSON.stringify({
                        username: user.username,
                        userId: user._id
                    }));

                    this.router.navigate(['/chat']).then((d) => console.log(d));
                }
            }, (err) => {
                this.loginError = true;
                console.log('Error: ', err);
            });
    }
}
