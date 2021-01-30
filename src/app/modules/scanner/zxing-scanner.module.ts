import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ZXingScannerComponent } from './zxing-scanner.component';

const COMPONENTS = [
  ZXingScannerComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ]
})
export class ZXingScannerModule {
}
