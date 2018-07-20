import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatModule} from "./mat/mat.module";
import {ValidatorMessageComponent} from './components/validator-message/validator-message.component';

@NgModule({
    imports: [
        CommonModule,
        MatModule
    ],
    declarations: [ValidatorMessageComponent],
    exports: [MatModule, ValidatorMessageComponent]
})
export class SharedModule {
}
