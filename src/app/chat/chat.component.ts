import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from './chat.service';
import { Message } from './chat.model';
import { WebSocketService } from '../web-socket.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
    // Array<Message> === Message[]
    @ViewChild('scrollBottom') private scrollContainer: ElementRef;
    public messageForm: FormGroup = new FormGroup({
        messageControl: new FormControl('')
    });
    public messages: Array<Message> = [];
    public userId = '';
    private currentScrollPosition = 0;
    private username = '';
    private disableScrollDown = false;
    public isEdit = false;
    private messageForEdit: Message;

    constructor(
        private chatService: ChatService,
        private socketService: WebSocketService,
        private ngZone: NgZone
    ) {
    }

    ngOnInit() {
        this.disableScrollDown = false;

        this.getChats();

        if (localStorage.getItem('user')) {
            const currentUser = JSON.parse(localStorage.getItem('user'));

            this.username = currentUser['username'];
            this.userId = currentUser['userId'];
        }

        this.initIoConnection();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.socketService.onCreateMessage()
            .subscribe((message: Message) => {
                this.messageForm.reset();
                this.messageForm.patchValue({ messageControl: '' });
                this.messages.push(message);
                this.disableScrollDown = false;
            });

        this.socketService.onUpdateMessage()
            .subscribe((message: Message) => {
                this.cancelEdit(null);

                this.messages.forEach((item: Message, index) => {
                    if (item._id === message._id) {
                        this.messages[index] = message;
                    }
                });
            }, err => console.error(err));

        this.socketService.onRemoveMessage()
            .subscribe((message: Message) => {
                this.messages.forEach((item: Message, index) => {
                    if (item._id === message._id) {
                        this.messages[index] = message;
                    }
                });
            });
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

        this.socketService.send(message);
    }

    public edit(event) {
        event.preventDefault();

        this.messageForEdit.message = this.messageForm.get('messageControl').value;
        this.socketService.update(this.messageForEdit);
    }

    public cancelEdit(event) {
        if (event) {
            event.preventDefault();
        }

        this.isEdit = false;
        this.messageForm.reset();
        this.messageForm.patchValue({ messageControl: '' });
    }

    public editMessage(message: Message) {
        this.isEdit = true;
        this.messageForEdit = message;
        this.messageForm.patchValue({ messageControl: message.message });
    }

    public removeMessage(message: Message) {
        this.chatService.removeMessage(message._id)
            .subscribe((data) => {
                console.log(data);
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

    byCreatedAt(i, message: Message) {
        const date = new Date(message.createdAt);

        return message ? date.getTime() : undefined;
    }
}
