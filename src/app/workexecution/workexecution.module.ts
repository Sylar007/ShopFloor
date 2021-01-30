import { NgModule } from '@angular/core';
import { WorkExecutionRoutingModule } from './workexecution-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    WorkExecutionRoutingModule,
    MatTableModule
  ]
})
export class WorkExecutionModule { }
