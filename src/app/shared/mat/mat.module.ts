import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [],
    exports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class MatModule {
}
