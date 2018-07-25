import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from './shared/app.guard';

const routes: Routes = [
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    {
        path: 'chat',
        canActivate: [AppGuard],
        loadChildren: './chat/chat.module#ChatModule'
    }
    // {path: '', redirectTo: 'chat', pathMatch: 'full'},
    // {path: '**', redirectTo: ''}
];
// Try : CanActivate, CanActivateChild for routing guard;
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
