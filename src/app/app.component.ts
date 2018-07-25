import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router) {
    }

    signOut() {
        localStorage.removeItem('user');
        this.router.navigate(['/auth']).then((d) => console.log(d));
    }
}
