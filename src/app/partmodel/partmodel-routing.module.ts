import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartModelListComponent } from './partmodellist.component';
import { PartModelViewComponent } from './partmodelview.component';
import { PartModelEditComponent } from './partmodeledit.component';
import { PartModelAddComponent } from './partmodeladd.component';

const routes: Routes = [
  { path: '', component: PartModelListComponent },
  { path: 'partmodelview/:id', component: PartModelViewComponent },
  { path: 'partmodeledit/:id', component : PartModelEditComponent },
  { path: 'partmodeladd', component : PartModelAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartModelRoutingModule { }
