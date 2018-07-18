import {Component, OnInit, AfterContentInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ChatService} from './chat.service';
import {Message} from './chat.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    // Array<Message> === Message[]
    // AfterContentInit - module for init after load content
    public messageControl: FormControl = new FormControl('');
    public messages: Array<Message> = [];
    private timer: any

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.getChats();

        // remove after adding sokets.
        this.timer = setInterval(() => {
            this.getChats();
        }, 5000)
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    private getChats() {
        this.chatService.getMessages()
            .subscribe((data: Message[]) => {
                this.messages = data;
                console.log(this.messages);
            }, err => {
                console.log(err);
            });
    }

    public send() {
        const message: Message = {
            nickName: localStorage.getItem('nickname'),
            message: this.messageControl.value
        };

        console.log(message);

        this.chatService.sendMessage(message)
            .subscribe(() => {
                // clear value or use .reset();
                this.messageControl.patchValue('');
                // update chat
                this.getChats();
            }, (err) => {
                console.error(err);
            });
    }
}