import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianEntryListComponent } from './technicianentrylist.component';
// import { TechnicianEntryViewComponent } from './technicianentryview.component';
import { TechnicianEntryEditComponent } from './technicianentryedit.component';
// import { TechnicianEntryAddComponent } from './technicianentryadd.component';

const routes: Routes = [
  { path: '', component: TechnicianEntryListComponent },
  // { path: 'operationentryview/:id', component: OperationEntryViewComponent },
  { path: 'technicianentryedit/:id', component : TechnicianEntryEditComponent },
  // { path: 'operationentryadd', component : OperationEntryAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianEntryRoutingModule { }
