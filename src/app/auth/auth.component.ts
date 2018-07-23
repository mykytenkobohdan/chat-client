import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public authForm: FormGroup;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.authForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required, Validators.minLength(3)])
        });
    }

    public login(): void {
        console.log(this.authForm.value);
        // localStorage.setItem('nickname', this.nameControl.value);

        /* this.router.navigate(['/chat'])
         .then((d) => console.log(d));*/
    }
}
