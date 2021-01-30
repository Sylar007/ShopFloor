import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperationEntryListComponent } from './operationentrylist.component';
import { OperationEntryViewComponent } from './operationentryview.component';
import { OperationEntryEditComponent } from './operationentryedit.component';
import { OperationEntryAddComponent } from './operationentryadd.component';

const routes: Routes = [
  { path: '', component: OperationEntryListComponent },
  { path: 'operationentryview/:id', component: OperationEntryViewComponent },
  { path: 'operationentryedit/:id', component : OperationEntryEditComponent },
  { path: 'operationentryadd', component : OperationEntryAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationEntryRoutingModule { }
