import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartTypeListComponent } from './parttypelist.component';
import { PartTypeViewComponent } from './parttypeview.component';
import { PartTypeEditComponent } from './parttypeedit.component';
import { PartTypeAddComponent } from './parttypeadd.component';

const routes: Routes = [
  { path: '', component: PartTypeListComponent },
  { path: 'parttypeview/:id', component: PartTypeViewComponent },
  { path: 'parttypeedit/:id', component : PartTypeEditComponent },
  { path: 'parttypeadd', component : PartTypeAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartTypeRoutingModule { }
