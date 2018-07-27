import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from "./shared/shared.module";
import {AppGuard} from "./app.guard";
import {WebSocketService} from "./web-socket.service";

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
        SharedModule,
        RouterModule,
        ToastrModule.forRoot({positionClass: 'toast-top-center'})
    ],
    providers: [AppGuard, WebSocketService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
