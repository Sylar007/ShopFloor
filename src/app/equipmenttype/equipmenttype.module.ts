import { NgModule } from '@angular/core';
import { EquipmentTypeRoutingModule } from './equipmenttype-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    EquipmentTypeRoutingModule,
    MatTableModule
  ]
})
export class EquipmentTypeModule { }
