import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ChatModule} from './chat/chat.module';
import {RegistrationModule} from './registration/registration.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from "./shared/shared.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        ChatModule,
        RegistrationModule,
        AuthModule,
        SharedModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
