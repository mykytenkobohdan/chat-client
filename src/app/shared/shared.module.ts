import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {MatModule} from "./mat/mat.module";
import {ValidatorMessageComponent} from './components/validator-message/validator-message.component';

@NgModule({
    imports: [
        CommonModule,
        MatModule,
        ToastrModule.forRoot({ positionClass: 'toast-top-center'})
    ],
    declarations: [ValidatorMessageComponent],
    exports: [MatModule, ValidatorMessageComponent]
})
export class SharedModule {
}
