import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {RegistrationModule} from './registration/registration.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from "./shared/shared.module";
import {AppGuard} from "./app.guard";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        // ChatModule, remove module for lazy load
        RegistrationModule,
        AuthModule,
        SharedModule,
        RouterModule,
        ToastrModule.forRoot({positionClass: 'toast-top-center'})
    ],
    providers: [AppGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
