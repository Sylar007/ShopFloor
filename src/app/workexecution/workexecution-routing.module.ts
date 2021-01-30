import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkExecutionComponent } from './workexecution.component';

const routes: Routes = [
  { path: '', component : WorkExecutionComponent },
  { path: 'workexecution/:id', component : WorkExecutionComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class WorkExecutionRoutingModule { }
