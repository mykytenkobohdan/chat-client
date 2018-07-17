import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AppRoutingModule} from './app-routing.module';
import {ChatModule} from './chat/chat.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        ChatModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
