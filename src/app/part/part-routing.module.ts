import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartListComponent } from './partlist.component';
import { PartViewComponent } from './partview.component';
import { PartEditComponent } from './partedit.component';
import { PartAddComponent } from './partadd.component';

const routes: Routes = [
  { path: '', component : PartListComponent },
  { path: 'partview/:id', component : PartViewComponent },
  { path: 'partedit/:id', component : PartEditComponent },
  { path: 'partadd', component : PartAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartRoutingModule { }
