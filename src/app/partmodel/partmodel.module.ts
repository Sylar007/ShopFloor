import { NgModule } from '@angular/core';
import { PartModelRoutingModule } from './partmodel-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    PartModelRoutingModule,
    MatTableModule
  ]
})
export class PartModelModule { }
