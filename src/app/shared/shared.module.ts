import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {MatModule} from "./mat/mat.module";
import {ValidatorMessageComponent} from './components/validator-message/validator-message.component';
import {AppGuard} from "./app.guard";

@NgModule({
    imports: [
        CommonModule,
        MatModule,
        ToastrModule.forRoot({positionClass: 'toast-top-center'})
    ],
    declarations: [ValidatorMessageComponent],
    providers: [AppGuard],
    exports: [MatModule, ValidatorMessageComponent]
})
export class SharedModule {
}
