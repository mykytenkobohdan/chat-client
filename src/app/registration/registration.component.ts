import {Component, OnInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    public registrationForm: FormGroup;
    public formTouched: boolean = false;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            userName: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ]),
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ]),
            confirmPassword: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                this.passwordsAreEqual()
            ]),
        });
    }

    // TODO: Fixed passwords validator; Add confirm password and password in one FormGroup;
    private passwordsAreEqual(): ValidatorFn {
        return (group: FormGroup) => {
            console.log(group);

            if (!(group.dirty || group.touched) || group.get('password').value === group.get('confirmPassword').value) {
                return null;
            }

            return {passwordEqual: true}
        };
    }

    send() {
        this.formTouched = true;

        console.log(this.registrationForm.controls);
        // console.log(this.registrationForm.value);
    }
}