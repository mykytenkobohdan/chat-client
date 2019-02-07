import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {
    private isUser: any = localStorage.getItem('user');

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // if (!this.isUser) {
        //     this.router.navigate(['/auth']);
        //     return false;
        // }

        return true;
    }
}
