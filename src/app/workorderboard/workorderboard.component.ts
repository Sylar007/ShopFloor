import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService, AccountService } from '../_services';
import { first } from 'rxjs/operators';
import { Dashboard, User } from '../_models';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './workorderboard.component.html',
  styleUrls: ['./workorderboard.component.css']
})
export class WorkOrderBoardComponent implements OnInit {
  id: number;
  dashboards: Dashboard[];
  dashboard: Dashboard;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.user = this.accountService.userValue;
    this.dashboardService.getDashboardList(this.user.id)
      .pipe(first())
      .subscribe(dashboards => this.dashboards = dashboards);
  }
  saveAssign(id) {
    this.id = id;
    this.router.navigate(['/workexecution/', { id: this.id }]);
  }
}
