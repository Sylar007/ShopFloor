import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkOrderListComponent} from './workorderlist.component';
import {WorkOrderViewComponent} from './workorderview.component';
import {WorkOrderEditComponent} from './workorderedit.component';
import {WorkOrderAddComponent} from './workorderadd.component';
import {WorkOrderSubTaskFileComponent} from './workordersubtaskfile.component';

const routes: Routes = [
    { path: '', component : WorkOrderListComponent },
    { path: 'workorderview', component : WorkOrderViewComponent },
    { path: 'workordersubtaskfile', component : WorkOrderSubTaskFileComponent },
    { path: 'workorderview/:workorderNo', component : WorkOrderViewComponent },
    { path: 'workorderedit/:workorderNo', component : WorkOrderEditComponent },
    { path: 'workorderadd', component : WorkOrderAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
