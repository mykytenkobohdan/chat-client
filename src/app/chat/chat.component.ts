import {Component, OnInit, AfterContentInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
    public messageForm: FormGroup = new FormGroup({
        messageControl: new FormControl('')
    });
    // public messageControl: FormControl = new FormControl('');
    public messages: Array<Message> = [];
    private username = '';
    public userId = '';
    private timer: any;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.getChats();

        if (localStorage.getItem('user')) {
            const currentUser = JSON.parse(localStorage.getItem('user'));

            this.username = currentUser['username'];
            this.userId = currentUser['userId'];
        }

        // remove after adding sokets.
        this.timer = setInterval(() => {
            // this.getChats();
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
            username: this.username,
            message: this.messageForm.controls.messageControl.value,
            userId: this.userId
        };

        this.chatService.sendMessage(message)
            .subscribe(() => {
                // clear value or use .reset();
                // this.messageForm.controls.messageControl.patchValue('');
                this.messageForm.reset();
                // update chat
                this.getChats();
            }, (err) => {
                console.error(err);
            });
    }
}