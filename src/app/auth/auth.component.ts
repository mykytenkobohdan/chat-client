import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public authForm: FormGroup;
    public loginError: boolean = false;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.authForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    public login(): void {
        this.authService.login(this.authForm.value)
            .subscribe((data: Array<{}>) => {
                if (data.length > 0) {
                    console.log('Success: ', data);
                    this.loginError = false;
                    localStorage.setItem('nickname', data[0]['username']);
                    this.router.navigate(['/chat']).then((d) => console.log(d));
                } else {
                    this.loginError = true;
                }
            }, (err) => {
                this.loginError = true;
                console.log('Error: ', err);
            });
    }
}
