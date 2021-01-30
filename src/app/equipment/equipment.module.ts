import { NgModule } from '@angular/core';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    EquipmentRoutingModule,
    MatTableModule
  ]
})
export class EquipmentModule { }
