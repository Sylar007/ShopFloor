import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentTypeListComponent } from './equipmenttypelist.component';
import { EquipmentTypeViewComponent } from './equipmenttypeview.component';
import { EquipmentTypeEditComponent } from './equipmenttypeedit.component';
import { EquipmentTypeAddComponent } from './equipmenttypeadd.component';

const routes: Routes = [
  { path: '', component: EquipmentTypeListComponent },
  { path: 'equipmenttypeview/:id', component: EquipmentTypeViewComponent },
  { path: 'equipmenttypeedit/:id', component : EquipmentTypeEditComponent },
  { path: 'equipmenttypeadd', component : EquipmentTypeAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentTypeRoutingModule { }
