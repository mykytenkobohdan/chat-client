import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './chat.component';
import {ChatService} from './chat.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [ChatService],
    declarations: [ChatComponent]
})
export class ChatModule {
}
