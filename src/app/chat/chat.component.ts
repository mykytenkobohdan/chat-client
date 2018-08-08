import {Component, OnInit, OnChanges, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ChatService} from './chat.service';
import {Message} from './chat.model';
import {WebSocketService} from '../web-socket.service';
import {Event} from '../web-socket.service';

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

    constructor(private chatService: ChatService, private socketService: WebSocketService) {
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

        this.socketService.onMessage()
            .subscribe((message: Message) => {
                this.messages.push(message);
                this.disableScrollDown = false;
            });

        this.socketService.onUpdateMessage()
            .subscribe((message: Message) => {
                this.messages.forEach((item: Message, index) => {
                    if (item._id === message._id) {
                        this.messages[index] = message;
                    }
                });
            });

        this.socketService.onEvent(Event.CONNECT)
            .subscribe(() => {
                console.log('connected');
            });

        this.socketService.onEvent(Event.DISCONNECT)
            .subscribe(() => {
                console.log('disconnected');
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

        this.chatService.sendMessage(message)
            .subscribe(() => {
                this.messageForm.reset();
            }, (err) => {
                console.error(err);
            });
    }

    public edit(event) {
        event.preventDefault();

        this.messageForEdit.message = this.messageForm.get('messageControl').value;
        this.chatService.updateMessage(this.messageForEdit)
            .subscribe(() => {
                this.cancelEdit(null);
            }, (err) => {
                console.error(err);
            });
    }

    public cancelEdit(event) {
        if (event) {
            event.preventDefault();
        }

        this.isEdit = false;
        this.messageForm.patchValue({messageControl: ''});
    }

    public editMessage(message: Message) {
        this.isEdit = true;
        this.messageForEdit = message;
        this.messageForm.patchValue({messageControl: message.message});
    }

    public removeMessage(message: Message) {
        console.log('remove: ', message);
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
