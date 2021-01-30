import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '../public_api';
import { ScannerComponent } from './scanner.component';

const UI_MODULES = [

  // Angular
  BrowserAnimationsModule,
  FormsModule,

  // Local
  ZXingScannerModule,

];

@NgModule({ exports: UI_MODULES,
  declarations: [ScannerComponent]
})
export class ScannerModule { }
