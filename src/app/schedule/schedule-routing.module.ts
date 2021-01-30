import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleListComponent } from './schedulelist.component';
// import { ScheduleViewComponent } from './scheduleview.component';
import { ScheduleEditComponent } from './scheduleedit.component';
import { ScheduleAddComponent } from './scheduleadd.component';

const routes: Routes = [
  { path: '', component : ScheduleListComponent },
  //{ path: 'scheduleview/:id', component : ScheduleViewComponent },
  { path: 'scheduleedit/:id', component : ScheduleEditComponent },
  { path: 'scheduleadd', component : ScheduleAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
