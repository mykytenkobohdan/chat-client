import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RegistrationService} from './registration.service';
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [RegistrationComponent],
    providers: [RegistrationService]
})
export class RegistrationModule {
}
