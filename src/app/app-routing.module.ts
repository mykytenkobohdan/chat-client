import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppGuard} from './app.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AppGuard],
    loadChildren: 'src/app//chat/chat.module#ChatModule'
  },
  {path: 'registration', loadChildren: 'src/app/registration/registration.module#RegistrationModule'},
  {path: 'auth', loadChildren: 'src/app/auth/auth.module#AuthModule'},
  {
    path: 'user/:userId',
    canActivate: [AppGuard],
    loadChildren: 'src/app/user/user.module#UserModule'
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
