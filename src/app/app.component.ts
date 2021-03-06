import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'app';
    isLogin: boolean = !!localStorage.getItem('user');
    user: any = JSON.parse(localStorage.getItem('user'));
    private subscription: Subscription;

    constructor(private router: Router, private appService: AppService) {
    }

    ngOnInit() {
        this.appService
            .userSubject
            .subscribe(item => {
                this.isLogin = !!localStorage.getItem('user');
                this.user = JSON.parse(localStorage.getItem('user'));
            });
    }

    signOut() {
        localStorage.removeItem('user');
        this.isLogin = false;
        this.router.navigate(['/auth']).then((d) => console.log(d));
    }

    onAuth(event) {
    }
}
