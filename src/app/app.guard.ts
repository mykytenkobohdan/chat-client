import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(next);
        console.log(state);
        if (state.url === '/chat') {
            if (localStorage.getItem('user')) {
                return true
            } else {
                this.router.navigate(['/auth']);
                return false;
            }
        }

        return true;
    }
}
