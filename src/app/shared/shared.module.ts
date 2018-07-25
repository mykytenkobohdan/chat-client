import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatModule} from "./mat/mat.module";
import {ValidatorMessageComponent} from './components/validator-message/validator-message.component';
import {AppGuard} from "./app.guard";

@NgModule({
    imports: [
        CommonModule,
        MatModule
    ],
    declarations: [ValidatorMessageComponent],
    providers: [AppGuard],
    exports: [MatModule, ValidatorMessageComponent]
})
export class SharedModule {
}
