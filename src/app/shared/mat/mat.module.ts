import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    declarations: [],
    exports: [
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class MatModule {
}
