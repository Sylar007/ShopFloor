import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentListComponent } from './equipmentlist.component';
import { EquipmentEditComponent } from './equipmentedit.component';
import { EquipmentAddComponent } from './equipmentadd.component';
import { EquipmentViewComponent } from './equipmentview.component';
import { EquipmentLogComponent } from './equipmentlog.component';

const routes: Routes = [
  { path: '', component : EquipmentListComponent },
  { path: 'equipmentview', component : EquipmentViewComponent },
  { path: 'equipmentview/:equipment_no', component : EquipmentViewComponent },
  { path: 'equipmentedit/:equipment_no', component : EquipmentEditComponent },
  { path: 'equipmentlog/:equipment_no', component : EquipmentLogComponent },
  { path: 'equipmentadd', component : EquipmentAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
