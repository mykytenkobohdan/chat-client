import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    public nameError: boolean;
    public nameControl: FormControl = new FormControl('', [Validators.required]);

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public login(): void {
        console.log(this.nameControl);
        this.nameError = this.nameControl.invalid;
        localStorage.setItem('nickname', this.nameControl.value);

        this.router.navigate(['/chat'])
            .then((d) => console.log(d));
    }
}
