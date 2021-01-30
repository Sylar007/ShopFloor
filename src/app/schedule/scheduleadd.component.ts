import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService, WorkOrderSelectionService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Schedule, ScheduleSelection, ShiftSelection, StationSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PartDialogComponent } from './partdialog.component';

export class FormInput {
  schedule_name: any;
  shift_name: any;
  partset_name: any;
  partset_code: any;
  dpFrom: any;
  dpTo: any;
  quantity: any;
  station_name: any;
}

@Component({
  templateUrl: './scheduleadd.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleAddComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  schedule: Schedule;
  isEditMode = false;
  stationSelections: StationSelection[] = [];
  shiftSelections: ShiftSelection[] = [];
  scheduleSelections: ScheduleSelection[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private workorderSelectionService: WorkOrderSelectionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      schedule_name: '',
      shift_name: '',
      partset_name: '',
      partset_code: '',
      dpFrom: '',
      dpTo: '',
      quantity: '',
      station_name: ''
    };
    this.workorderSelectionService.getScheduleSelection()
      .pipe(first())
      .subscribe(scheduleSelections => this.scheduleSelections = scheduleSelections);

    this.workorderSelectionService.getStationSelection()
      .pipe(first())
      .subscribe(stationSelections => this.stationSelections = stationSelections);

    this.workorderSelectionService.getShiftSelection()
      .pipe(first())
      .subscribe(shiftSelections => this.shiftSelections = shiftSelections);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig
    let dialogRef = this.dialog.open(PartDialogComponent, {
      data: { woid: 1, task_sub_id: 2, upload_type: 1 },
      height: '70%',
      width: '65%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.formInput.partset_name = result.id;
      this.formInput.partset_code = result.partset_code;
    });
  }

  saveStep1(form: any) {
    const localSchedule = new Schedule();
    localSchedule.partSet_Id = parseInt(this.formInput.partset_name, 10);
    localSchedule.required_Quantity = parseInt(form.value.quantity, 10);
    localSchedule.scheduleType_id = parseInt(form.value.schedule_id, 10);
    localSchedule.schedule_StartDate = form.value.dpFrom.year + '-' + form.value.dpFrom.month + '-' + form.value.dpFrom.day;
    localSchedule.schedule_EndDate = form.value.dpTo.year + '-' + form.value.dpTo.month + '-' + form.value.dpTo.day;
    localSchedule.shift_id = parseInt(form.value.shift_id, 10);
    localSchedule.workstation_id = parseInt(form.value.station_id, 10);
    this.scheduleService.addSchedule(localSchedule)
      .pipe(first())
      .subscribe(returnObj => {
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
