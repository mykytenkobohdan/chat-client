import {Component, OnInit, AfterContentInit} from '@angular/core';
import {ChatService} from './chat.service';
import {Message} from './chat.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    // Array<Message> === Message[]
    public messages: Array<Message> = [];
    // AfterContentInit - module for init after load content
    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.getChats();
    }

    getChats() {
        this.chatService.getMessages()
            .subscribe((data: Message[]) => {
                this.messages = data;
                console.log(this.messages);
            }, err => {
                console.log(err);
            });
    }
}