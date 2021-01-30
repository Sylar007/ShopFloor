import { NgModule } from '@angular/core';
import { TechnicianEntryRoutingModule } from './technicianentry-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    TechnicianEntryRoutingModule,
    MatTableModule
  ]
})
export class TechnicianEntryModule { }
