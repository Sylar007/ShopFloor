import { NgModule } from '@angular/core';
import { WorkOrderRoutingModule } from './workorder-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    WorkOrderRoutingModule,
    MatTableModule
  ]
})
export class WorkOrderModule { }
