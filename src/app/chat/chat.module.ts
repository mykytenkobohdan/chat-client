import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material';
import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {ChatService} from "./chat.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ChatRoutingModule,
        MatCardModule
    ],
    providers: [ChatService],
    declarations: [ChatComponent]
})
export class ChatModule {
}
