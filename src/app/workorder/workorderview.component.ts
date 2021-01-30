import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScannerService, WorkOrderSelectionService, WorkOrderService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderScanner } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

@Component({
  templateUrl: './workorderview.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderViewComponent implements OnInit {
  id: string;
  scannerWorkOrder: WorkOrderScanner;
  workorderParts: WorkOrderPart[] = [];
  workorderPart: WorkOrderPart;
  workorderSet: boolean;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  woId: number;

  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_id', 'part_name', 'part_code', 'serial_no'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // treeview start
  items: any;

  config: TreeviewConfig = {
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: true
  };
  // treeview end

  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private scannerService: ScannerService,
    private workorderService: WorkOrderService,
    private workorderselectionService: WorkOrderSelectionService
  ) {
    this.workorderPart = {} as WorkOrderPart;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['workorderNo'];
    this.scannerService.openWorkOrder(this.id)
      .pipe(first())
      .subscribe(x => {
        this.scannerWorkOrder = x;
        this.workorderSet = true;
        this.woId = Number(this.scannerWorkOrder.id);
        // Fetch All PartEquipment on Page load
        this.workorderService.getWorkOrderPart(this.id)
          .pipe(first())
          .subscribe(workorderParts => {
            this.dataSourcePart = new MatTableDataSource(workorderParts);
            this.dataSourcePart.paginator = this.paginator;
          });
        this.workorderselectionService.getTaskSelection(this.woId, this.scannerWorkOrder.equipment_id, this.scannerWorkOrder.wo_type_id)
          .pipe(first())
          .subscribe(returnObj => {
            this.items = this.getItems(returnObj);
            console.log(this.items);
          });
      });
  }
  editItem(element) {
    this.workorderPart = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fieldForm.resetForm();
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
    if (this.fieldForm.form.valid) {
      if (this.isEditMode)
        this.updateStudent()
      else
        this.addStudent();
    } else {
      console.log('Enter valid data!');
    }
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    Object.keys(parentChildObj).forEach(function (key) {
      itemsArray.push(new TreeviewItem(parentChildObj[key]));
    });
    return itemsArray;
  }
}
