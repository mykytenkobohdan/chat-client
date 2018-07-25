import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    // {path: '**', redirectTo: ''}
];
// Try : CanActivate, CanActivateChild for routing guard;
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
