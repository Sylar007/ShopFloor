import { NgModule } from '@angular/core';
import { PartTypeRoutingModule } from './parttype-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    PartTypeRoutingModule,
    MatTableModule
  ]
})
export class PartTypeModule { }
