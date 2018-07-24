import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {RegistrationService} from './registration.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public registrationForm: FormGroup;
    public duplicateName: boolean = false;

    constructor(private fb: FormBuilder,
                private registrationService: RegistrationService,
                private router: Router,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: this.fb.group({
                pwd: ['', [Validators.required, Validators.minLength(3)]],
                confirm: ['', [Validators.required, Validators.minLength(3)]]
            }, {validator: RegistrationComponent.passwordsAreEqual()})
        });
    }

    send() {
        const data = Object.assign({}, this.registrationForm.value);
        data.password = data.password.pwd;

        this.registrationService.registration(data)
            .subscribe((res) => {
                console.log('Response: ', res);
                if (res['error']) {
                    this.duplicateName = true;
                    console.log(res['errorMessage']);
                    return;
                }

                this.toastr.success('You was authorize!');
                this.duplicateName = false;
                this.registrationForm.reset();
                localStorage.setItem('nickname', data.username);
                this.router.navigate(['/chat']);
            }, (err) => {
                console.error(err);
            });
    }

    private static passwordsAreEqual(): ValidatorFn {
        return (group: FormGroup) => {
            if (!(group.dirty || group.touched) || group.get('pwd').value === group.get('confirm').value) {
                return null;
            }

            return {passwordEqual: true}
        };
    }
}