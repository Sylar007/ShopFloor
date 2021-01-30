import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { PartService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PartSet } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class FormOutput {
  id: any;
  partset_code: any;
}

@Component({
  templateUrl: './partdialog.component.html',
  styleUrls: ['./schedule.component.css']
})
export class PartDialogComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['partset_code', 'parts'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedRowIndex = -1;
  woId: number;
  fileType: string;
  task_sub_id: number;
  upload_type: number;
  schedulejobList: PartSet;
  formOutput: FormOutput;
  constructor(private partService: PartService, private route: ActivatedRoute, public matDialogRef: MatDialogRef<PartDialogComponent>) { }

  ngOnInit(): void {
    this.formOutput = {
      id: '',
      partset_code: ''
    };
    this.partService.getPartSetSelection()
      .pipe(first())
      .subscribe(partSets => {
        this.dataSource = new MatTableDataSource(partSets);
        this.dataSource.paginator = this.paginator;
      });
  }

  chooseSchedule(id,partset_code) {
      this.formOutput.id = id;
      this.formOutput.partset_code = partset_code;
      this.matDialogRef.close(this.formOutput);
  }
}
