import {Component, OnInit, AfterContentInit} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    // AfterContentInit - module for init after load content
    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.getChats();
    }

    getChats() {
        this.chatService.getMessages()
            .subscribe(data => {
                console.log(data);
            }, err => {
                console.log(err);
            });
    }
}
