import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { UploadService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReturnFile } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-workordersubtaskfile',
  templateUrl: './workordersubtaskfile.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderSubTaskFileComponent implements OnInit {
  dataSourceUpload = new MatTableDataSource();
  displayedPartColumns: string[] = ['id', 'file_name', 'file_type'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  returnFiles: ReturnFile[] = [];
  returnFile: ReturnFile;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  woId: number;
  fileType: string;
  task_sub_id: number;
  upload_type: number;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadService, private route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: {woid: number, task_sub_id: number, upload_type: number}) { this.returnFile = {} as ReturnFile; }

  ngOnInit(): void {
    this.woId = this.data.woid;
    this.task_sub_id = this.data.task_sub_id;
    this.upload_type = this.data.upload_type;
    this.fileType = "wo";
    this.uploadService.getTaskSubFiles(this.woId, this.task_sub_id, this.upload_type)
      .pipe(first())
      .subscribe(returnFiles => {
        this.dataSourceUpload = new MatTableDataSource(returnFiles);
        this.dataSourceUpload.paginator = this.paginator;
      });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.uploadTaskSub(this.currentFile, this.woId, this.fileType, this.task_sub_id, this.upload_type).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadService.getTaskSubFiles(this.woId, this.task_sub_id, this.upload_type)
            .pipe(first())
              .subscribe(returnFiles => {
                this.dataSourceUpload = new MatTableDataSource(returnFiles);
                this.dataSourceUpload.paginator = this.paginator;
              });
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  deleteFile(id) {
    // this.uploadService.deleteFile(id)
    //   .pipe(first())
    //   .subscribe(deleteFile => {
    //     this.uploadService.getFiles(this.woId)
    //       .pipe(first())
    //       .subscribe(returnFiles => {
    //         this.dataSourceUpload = new MatTableDataSource(returnFiles);
    //         this.dataSourceUpload.paginator = this.paginator;
    //       });
    //   });
  }

  viewFile(id) {
    this.uploadService.viewTaskSubFile(id)
      .pipe(first())
      .subscribe((response: any) => {
        this.downloadFile(response);
      });
  }

  downloadFile(response) {
    let header_content = response.headers.get('content-disposition');
    let fileTemp = header_content.split('=')[1];
    let file = fileTemp.substr(0, fileTemp.indexOf(';'));
    //file = file.substring(1, file.length - 1);
    let extension = file.split('.')[1].toLowerCase();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    var newBlob = new Blob([response.body], { type: this.createFileType(extension) })

    // IE doesn't allow using a blob object directly as link href
    // instead it is necessary to use msSaveOrOpenBlob
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    //const data = window.URL.createObjectURL(newBlob);
    const url = window.URL.createObjectURL(newBlob);
    window.open(url);
    // var link = document.createElement('a');
    // link.href = data;
    // link.download = file;
    // link.click();
    // setTimeout(() => {
    //   // For Firefox it is necessary to delay revoking the ObjectURL
    //   window.URL.revokeObjectURL(data);
    // }, 400)
  }

  createFileType(e): string {
    let fileType: string = "";
    if (e == 'pdf' || e == 'csv') {
      fileType = `application/${e}`;
    }
    else if (e == 'jpeg' || e == 'jpg' || e == 'png') {
      fileType = `image/${e}`;
    }
    else if (e == 'txt') {
      fileType = 'text/plain';
    }

    else if (e == 'ppt' || e == 'pot' || e == 'pps' || e == 'ppa') {
      fileType = 'application/vnd.ms-powerpoint';
    }
    else if (e == 'pptx') {
      fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    else if (e == 'doc' || e == 'dot') {
      fileType = 'application/msword';
    }
    else if (e == 'docx') {
      fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }
    else if (e == 'xls' || e == 'xlt' || e == 'xla') {
      fileType = 'application/vnd.ms-excel';
    }
    else if (e == 'xlsx') {
      fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }

    return fileType;
  }
}
