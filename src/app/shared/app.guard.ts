import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(next);
        console.log(state);
        if (state.url === '/chat') {
            console.log('chat');
            return !!localStorage.getItem('user');
        }

        return true;
    }
}
