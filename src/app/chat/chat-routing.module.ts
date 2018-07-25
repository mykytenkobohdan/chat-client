import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChatComponent} from './chat.component';
import {AppGuard} from '../shared/app.guard';

const routes: Routes = [
    {
        path: 'chat',
        canActivate: [AppGuard],
        component: ChatComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule {
}
