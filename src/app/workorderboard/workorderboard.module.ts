import { NgModule } from '@angular/core';
import { WorkOrderBoardRoutingModule } from './workorderboard-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    WorkOrderBoardRoutingModule,
    MatTableModule
  ]
})
export class WorkOrderBoardModule { }
