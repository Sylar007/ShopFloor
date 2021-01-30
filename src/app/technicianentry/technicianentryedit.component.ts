import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService, WorkOrderSelectionService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FlowSelection, OperationTechnician, ScheduleSelection, ShiftSelection, StationSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

export class FormInput {
  station_name: any;
  schedule_name: any;
  shift_name: any;
  startDate: any;
  endDate: any;
  flow_name: any;
  parameter: any;
  recommendation: any;
}

@Component({
  templateUrl: './technicianentryedit.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianEntryEditComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  operationtechnician: OperationTechnician;
  isEditMode = false;
  isParameter = false;
  technician: OperationTechnician;
  flowSelections: FlowSelection[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private scheduleService: ScheduleService,
    private workorderSelectionService: WorkOrderSelectionService,
    public dialog: MatDialog
  ) {  this.technician = {} as OperationTechnician; }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      station_name: '',
      schedule_name: '',
      shift_name: '',
      startDate: '',
      endDate: '',
      flow_name: '',
      parameter: '',
      recommendation: ''
    };
    this.scheduleService.getTechnicianById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.station_name = x.station_name;
        this.formInput.schedule_name = x.schedule_name;
        this.formInput.shift_name = x.shift_name;
        this.formInput.startDate = x.startDate;
        this.formInput.endDate = x.endDate;
        this.formInput.flow_name = x.flow_id;
        this.formInput.parameter = x.parameter;
        this.formInput.recommendation = x.recommendation;
      });

    this.workorderSelectionService.getFlowSelection()
      .pipe(first())
      .subscribe(flowSelections => this.flowSelections = flowSelections);
  }

  public onOptionsStatusSelected(event) {
    const value = event.target.value;
    // Fetch All Category on Page load
    if (value === '1') {
      this.isParameter = true;
    }
    else {
      this.isParameter = false;
    }
  }

  saveStep1(form: any) {
    const localTechnician = new OperationTechnician();
    localTechnician.id = parseInt(this.id, 10);
    localTechnician.flow_id = parseInt(form.value.flow_id, 10);
    localTechnician.parameter = form.value.parameter;
    localTechnician.recommendation = form.value.recommendation;

    this.scheduleService.updateTechnician(localTechnician)
      .pipe(first())
      .subscribe(returnObj => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
  back() {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
