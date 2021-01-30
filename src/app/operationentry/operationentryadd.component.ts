import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService, OperationEntryService } from '../_services';
import { first } from 'rxjs/operators';
import { Operation_Entry, ScheduleJobList } from '../_models';
import * as _ from 'lodash';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OperationEntryDialogComponent } from './operationentrydialog.component';

export class ResultSelection {
  operator_entry_id: number;
  part_id: number;
  result: number
}

@Component({
  templateUrl: './operationentryadd.component.html',
  styleUrls: ['./operationentry.component.css']
})
export class OperationEntryAddComponent implements OnInit {
  form: any;
  isSubmit: boolean;
  id: number;
  isEditModeMain = false;
  schedulejobList: ScheduleJobList;
  searchValid: boolean;
  imageWidth: number = 280;
  imageMargin: number = 10;
  imageUrl: any;
  resultSelections: ResultSelection[] = [];
  isCount: number;
  constructor(
    private route: ActivatedRoute,
    private operationentryService: OperationEntryService,
    private scheduleService: ScheduleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig
    let dialogRef = this.dialog.open(OperationEntryDialogComponent, {
      data: { woid: 1, task_sub_id: 2, upload_type: 1 },
      height: '70%',
      width: '65%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.scheduleService.getScheduleJobById(result)
        .pipe(first())
        .subscribe(scheduleJob => {
          this.schedulejobList = scheduleJob
          this.searchValid = true;
          this.isCount = Object.keys(scheduleJob.parts).length;
        });
    });
  }

  saveStep1(form: any) {
    const localoperation_entry = new Operation_Entry();
    localoperation_entry.schedule_job_id = this.schedulejobList.id;
    if (this.isEditModeMain === false) {
      localoperation_entry.id = 0;
      this.operationentryService.addEntry(localoperation_entry)
        .pipe(first())
        .subscribe(returnObj => {
             this.isEditModeMain = true;
             this.id = Number(returnObj);
        });
    } else {
      // localoperation_entry.id = this.schedulejobList.id;
      // this.operationentryService.updateEntry(localoperation_entry)
      //   .pipe(first())
      //   .subscribe(returnObj => {
      //   });
    }
    //this.id = 8;
  }

  saveStep2(form: any) {
    if (this.resultSelections === null)
    {
      alert("Please enter all result");
      return;
    }
    if (this.resultSelections.length != this.isCount) {
      alert("Please enter all result");
      return;
    }
    this.operationentryService.entryDetails(this.resultSelections)
      .pipe(first())
      .subscribe(returnObj => {
        this.scheduleService.getEntryScheduleJobById(this.id)
          .pipe(first())
          .subscribe(returnParts => {
            this.schedulejobList.parts = returnParts;
            this.resultSelections = null;
            alert("Succesfully save the records");
            form.reset();
          });
      });
  }

  saveClose(form: any) {
  }
  callTechnician() {
  }
  radioselected(event: any, part: any) {
    let resultSelection = new ResultSelection();
    resultSelection.operator_entry_id = this.id;
    resultSelection.part_id = part.id;
    resultSelection.result = Number(event.target.value);
    if (this.resultSelections.find(item => item.part_id == resultSelection.part_id) === undefined) {
      this.resultSelections.push(resultSelection);
    }
    else {
      this.resultSelections.find(item => item.part_id == resultSelection.part_id).result = resultSelection.result;
    }
  }
}
