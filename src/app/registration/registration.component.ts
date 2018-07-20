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

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.registrationForm = this.fb.group({
            userName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: this.fb.group({
                pwd: ['', [Validators.required, Validators.minLength(3)]],
                confirm: ['', [Validators.required, Validators.minLength(3)]]
            }, {validator: RegistrationComponent.passwordsAreEqual()})
        });
    }

    send() {
        this.formTouched = true;

        console.log(this.registrationForm.controls);
        // console.log(this.registrationForm.value);
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