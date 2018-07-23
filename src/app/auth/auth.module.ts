import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './auth.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule,
        AuthRoutingModule
    ],
    declarations: [AuthComponent],
    providers: [AuthService]
})
export class AuthModule {
}
