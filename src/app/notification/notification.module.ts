import { NgModule } from '@angular/core';
import { NotificationRoutingModule } from './notification-routing.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    NotificationRoutingModule,
    MatTableModule
  ]
})
export class NotificationModule { }
