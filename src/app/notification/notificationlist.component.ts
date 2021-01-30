import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../_services';
import { first } from 'rxjs/operators';
import { NotificationList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './notificationlist.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationListComponent implements OnInit {
  notificationLists: NotificationList[] = [];
  notificationList: NotificationList;
  selectedRowIndex = -1;
  selectedPartId = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['notificationName', 'notificationReminder', 'notificationFrequency', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { this.notificationList = {} as NotificationList; }

  ngOnInit() {
    // Fetch All Part on Page load
    this.notificationService.getNotificationList()
      .pipe(first())
      .subscribe(notificationLists => {
        this.dataSource = new MatTableDataSource(notificationLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  editItem(element) {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  onSubmit() {

  }

  openPart(id) {
    this.router.navigate(['/notification/notificationview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/notification/notificationedit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/notification/notificationadd']);
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedPartId = null;
      this.selectedRowIndex = -1;
    }
    else {
      this.selectedPartId = row.id;
      this.selectedRowIndex = row.id;
    }
  }

}
