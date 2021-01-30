import { NgModule } from '@angular/core';
import { OperationEntryRoutingModule } from './operationentry-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    OperationEntryRoutingModule,
    MatTableModule
  ]
})
export class OperationEntryModule { }
