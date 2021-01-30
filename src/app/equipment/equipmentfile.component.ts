import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UploadService } from '../_services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReturnFile } from '../_models';

@Component({
  selector: 'app-equipmentfile',
  templateUrl: './equipmentfile.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentFileComponent implements OnInit {
  dataSourceUpload = new MatTableDataSource();
  displayedPartColumns: string[] = ['id', 'file_name', 'file_type'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  returnFiles: ReturnFile[] = [];
  returnFile: ReturnFile;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  @Input() equipmentId: string;
  @Input() fileType: string;
  @Input() viewOnly: boolean;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadService) { this.returnFile = {} as ReturnFile; }

  ngOnInit(): void {
    this.uploadService.getEquipmentFiles(this.equipmentId)
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
    this.uploadService.uploadEquipmentFile(this.currentFile, this.equipmentId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadService.getEquipmentFiles(this.equipmentId)
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
    this.uploadService.viewEquipmentFile(id)
      .pipe(first())
      .subscribe((response: any) => {
        this.downloadFile(response);
      });
  }

  downloadFile(response) {
    let header_content = response.headers.get('content-disposition');
    let fileTemp = header_content.split('=')[1];
    let file = fileTemp.substr(0, fileTemp.indexOf(';'));
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
    const url = window.URL.createObjectURL(newBlob);
    window.open(url);
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
