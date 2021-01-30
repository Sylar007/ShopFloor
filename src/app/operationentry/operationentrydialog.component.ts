import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { ScheduleService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleJobList } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  templateUrl: './operationentrydialog.component.html',
  styleUrls: ['./operationentry.component.css']
})
export class OperationEntryDialogComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['scheduleType', 'workstationName', 'partSet', 'startDate', 'endDate', 'requiredQuantity'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedRowIndex = -1;
  woId: number;
  fileType: string;
  task_sub_id: number;
  upload_type: number;
  schedulejobList: ScheduleJobList;

  constructor(private scheduleService: ScheduleService, private route: ActivatedRoute, public matDialogRef: MatDialogRef<OperationEntryDialogComponent>) { }

  ngOnInit(): void {
    this.scheduleService.openScheduleJobList()
      .pipe(first())
      .subscribe(scheduleJobs => {
        this.dataSource = new MatTableDataSource(scheduleJobs);
        this.dataSource.paginator = this.paginator;
      });
  }

  chooseSchedule(id) {
      this.matDialogRef.close(id);
  }
}
