import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { WorkOrderService } from '../_services';
import { first } from 'rxjs/operators';
import { WorkOrderList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './workorderlist.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderListComponent implements OnInit {
  workorderLists: WorkOrderList[] = [];
  workorderList: WorkOrderList;
  @ViewChild('fieldForm', { static: false })
  selectedRowIndex = -1;
  selectedWorkOrderNo = null;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['workorderNo', 'workorderType', 'equipmentName', 'plannedStartDate',
    'plannedEndDate', 'startDate', 'completedDate', 'status', 'location'];
  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workorderService: WorkOrderService
  ) {
    this.workorderList = {} as WorkOrderList;
  }

  ngOnInit() {
    // Fetch All Work Order on Page load
    this.workorderService.openWorkOrderList()
      .pipe(first())
      .subscribe(workorderLists => {
        this.dataSource = new MatTableDataSource(workorderLists);
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

  deleteItem(id) {
    // this.workorderPart.deletePartField(id)
    //   .subscribe(data => {
    //     this.workorderPart.getPartField(this.id)
    //       .pipe(first())
    //       .subscribe(partFields => this.dataSource.data = partFields);
    //   });
  }

  addStudent() {
    // this.workorderPart.createPartField(this.fieldForm.value)
    //   .pipe(first())
    //   .subscribe(data => {
    //     this.workorderPart.getPartField(this.id)
    //       .pipe(first())
    //       .subscribe(partFields => this.dataSource.data = partFields);
    //     this.cancelEdit();
    //   });
  }

  updateStudent() {
    // this.workorderPart.updatePartField(this.partField)
    //   .pipe(first())
    //   .subscribe(data => {
    //     this.workorderPart.getPartField(this.id)
    //       .pipe(first())
    //       .subscribe(partFields => this.dataSource.data = partFields);
    //     this.cancelEdit();
    //   });
  }

  onSubmit() {

  }

  openWorkOrder(orderNo) {
    this.router.navigate(['/workorder/workorderview/', orderNo]);
  }

  editWorkOrder(orderNo) {
    if (orderNo !== null) {
      this.router.navigate(['/workorder/workorderedit/', orderNo]);
    }
  }

  addWorkOrder() {
    this.router.navigate(['/workorder/workorderadd']);
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedWorkOrderNo = null;
      this.selectedRowIndex = -1;
    }
    else {
      this.selectedWorkOrderNo = row.workorderNo;
      this.selectedRowIndex = row.id;
    }
  }
}

