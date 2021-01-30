import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../_services';
import { first } from 'rxjs/operators';
import { PartList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleJobList } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './schedulelist.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['scheduleType', 'workstationName', 'partSet', 'startDate', 'endDate', 'requiredQuantity'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedRowIndex = -1;
  woId: number;
  fileType: string;
  task_sub_id: number;
  upload_type: number;
  schedulejobList: ScheduleJobList;
  isEditMode = false;
  selectedScheduleId = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService
  ) { this.schedulejobList = {} as ScheduleJobList; }

  ngOnInit() {
    this.scheduleService.openScheduleJobList()
    .pipe(first())
    .subscribe(scheduleJobs => {
      this.dataSource = new MatTableDataSource(scheduleJobs);
      this.dataSource.paginator = this.paginator;
    });
  }
  openPart(id) {
    this.router.navigate(['/schedule/scheduleview/', id]);
  }

  editSchedule(id) {
    if (id !== null) {
      this.router.navigate(['/schedule/scheduleedit/', id]);
    }
  }

  addSchedule() {
    this.router.navigate(['/schedule/scheduleadd']);
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedScheduleId = null;
      this.selectedRowIndex = -1;
    }
    else {
      this.selectedScheduleId = row.id;
      this.selectedRowIndex = row.id;
    }
  }

}
