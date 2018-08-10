import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat/mat.module';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        MatModule,
        HttpClientModule
    ],
    declarations: [ValidatorMessageComponent],
    providers: [],
    exports: [MatModule, ValidatorMessageComponent, HttpClientModule]
})
export class SharedModule {
}
