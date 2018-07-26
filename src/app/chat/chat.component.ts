import {Component, OnInit, OnDestroy, OnChanges, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ChatService} from './chat.service';
import {Message} from './chat.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
    // Array<Message> === Message[]
    @ViewChild('scrollBottom') private scrollContainer: ElementRef;
    public messageForm: FormGroup = new FormGroup({
        messageControl: new FormControl('')
    });
    public messages: Array<Message> = [];
    public userId = '';
    private currentScrollPosition: number = 0;
    private username = '';
    private disableScrollDown = false;
    private timer: any;

    constructor(private chatService: ChatService) {
    }

    ngOnInit() {
        this.disableScrollDown = false;

        this.getChats();

        if (localStorage.getItem('user')) {
            const currentUser = JSON.parse(localStorage.getItem('user'));

            this.username = currentUser['username'];
            this.userId = currentUser['userId'];
        }

        // remove after adding sockets.
        this.timer = setInterval(() => {
            this.getChats();
        }, 5000)
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
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

                this.disableScrollDown = false;
            }, (err) => {
                console.error(err);
            });
    }

    public onScroll(event) {
        if (!this.disableScrollDown) {
            this.currentScrollPosition = event.target.scrollTop;
        } else {
            if (this.currentScrollPosition > event.target.scrollTop) {
                console.log('scroll top');
            }
            this.currentScrollPosition = event.target.scrollTop;
        }

        this.disableScrollDown = true;
    }

    private scrollToBottom(): boolean {
        if (this.disableScrollDown) {
            return false;
        }

        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) {
            console.log(err);
        }
    }
}