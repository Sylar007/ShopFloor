import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { Role } from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const routes: Routes = [
  { path: 'account', loadChildren: accountModule },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard],
        data: { roles: [Role.Executive] },
        loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
      },
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        data: { roles: [Role.Executive] },
        loadChildren: () => import('./schedule/schedule.module').then(module => module.ScheduleModule)
      },
      {
        path: 'part',
        canActivate: [AuthGuard],
        data: { roles: [Role.Executive] },
        loadChildren: () => import('./part/part.module').then(module => module.PartModule)
      },
      {
        path: 'parttype',
        canActivate: [AuthGuard],
        data: { roles: [Role.Executive] },
        loadChildren: () => import('./parttype/parttype.module').then(module => module.PartTypeModule)
      },
      {
        path: 'technicianentry',
        canActivate: [AuthGuard],
        data: { roles: [Role.Executive] },
        loadChildren: () => import('./technicianentry/technicianentry.module').then(module => module.TechnicianEntryModule)
      },
      {
        path: 'operationentry',
        canActivate: [AuthGuard],
        data: { roles: [Role.Operator] },
        loadChildren: () => import('./operationentry/operationentry.module').then(module => module.OperationEntryModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
