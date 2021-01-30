import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleService } from '../_services';
import { first } from 'rxjs/operators';
import { PartList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OperationTechnicianList } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './technicianentrylist.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianEntryListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['scheduleType', 'workstationName', 'workstationStatus', 'partSet', 'startDate', 'endDate'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedRowIndex = -1;
  woId: number;
  fileType: string;
  task_sub_id: number;
  upload_type: number;
  operationtechnicianList: OperationTechnicianList;
  isEditMode = false;
  selectedScheduleId = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService
  ) { this.operationtechnicianList = {} as OperationTechnicianList; }

  ngOnInit() {
    this.scheduleService.openOperationTechnicianList()
    .pipe(first())
    .subscribe(operationtechnicians => {
      this.dataSource = new MatTableDataSource(operationtechnicians);
      this.dataSource.paginator = this.paginator;
    });
  }
  openPart(id) {
    this.router.navigate(['/technicianentry/technicianentryview/', id]);
  }

  editSchedule(id) {
    if (id !== null) {
      this.router.navigate(['/technicianentry/technicianentryedit/', id]);
    }
  }

  addSchedule() {
    this.router.navigate(['/technicianentry/technicianentryadd']);
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
