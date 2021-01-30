import { NgModule } from '@angular/core';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    ScheduleRoutingModule,
    MatTableModule
  ]
})
export class ScheduleModule { }
