import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationListComponent } from './notificationlist.component';
import { NotificationViewComponent } from './notificationview.component';
import { NotificationEditComponent } from './notificationedit.component';
import { NotificationAddComponent } from './notificationadd.component';

const routes: Routes = [
  { path: '', component : NotificationListComponent },
  { path: 'notificationview/:id', component : NotificationViewComponent },
  { path: 'notificationedit/:id', component : NotificationEditComponent },
  { path: 'notificationadd', component : NotificationAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
