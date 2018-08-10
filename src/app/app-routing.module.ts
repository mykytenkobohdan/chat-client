import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from './app.guard';

const routes: Routes = [
    { path: '', redirectTo: 'chat', pathMatch: 'full' },
    {
        path: 'chat',
        canActivate: [AppGuard],
        // lazy load module
        loadChildren: './chat/chat.module#ChatModule'
    },
    { path: 'registration', loadChildren: './registration/registration.module#RegistrationModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    {
        path: 'user/:userId',
        canActivate: [AppGuard],
        loadChildren: './user/user.module#UserModule'
    },
    { path: '**', redirectTo: 'chat' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
