import { NgModule } from '@angular/core';
import { PartRoutingModule } from './part-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    PartRoutingModule,
    MatTableModule
  ]
})
export class PartModule { }
