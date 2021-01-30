import { AfterViewChecked, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderSelectionService, PartEquipmentService, WorkOrderService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderSelection, WorkOrderTypeSelection, AssignSelection, PrioritySelection, NotificationSelection, WorkOrder } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkOrderSubTaskFileComponent } from './workordersubtaskfile.component';

export class FormInput {
  orderName: any;
  assignTo: any;
  notification_id: any;
  workorderType: any;
  priority: any;
  equipmentName: any;
  remarks: any;
  dpFrom: any;
  timeFrom: any;
  dpTo: any;
  timeTo: any;
}

@Component({
  templateUrl: './workorderadd.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderAddComponent implements OnInit, AfterViewChecked {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  workorderSet: boolean;
  selectedEquipmentId: number;
  selectedCategoryId: number;
  workorderSelection: WorkOrderSelection;
  workordertypeSelections: WorkOrderTypeSelection[] = [];
  assignSelections: AssignSelection[] = [];
  assignSelection: AssignSelection;
  notificationSelections: NotificationSelection[] = [];
  prioritySelections: PrioritySelection[] = [];
  workorderParts: WorkOrderPart[] = [];
  workorderPart: WorkOrderPart;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  selectUndefinedOptionValue: string;
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'serial_no'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isEditMode = false;
  isEditModeMain = false;
  woId: number;
  fileType: string;
  itemsCount: number;

  // treeview start
  items: any;

  config: TreeviewConfig = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 500,
    hasDivider: true
  };
  // treeview end

  constructor(
    private route: ActivatedRoute,
    private workorderselectionService: WorkOrderSelectionService,
    private partEquipmentService: PartEquipmentService,
    private workorderService: WorkOrderService,
    private router: Router,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {
    this.workorderPart = {} as WorkOrderPart;
    this.assignSelection = {} as AssignSelection;
    this.selectedEquipmentId = null;
    this.selectedCategoryId = null;
  }

  ngOnInit() {
    this.formInput = {
      orderName: '',
      assignTo: '',
      notification_id: '',
      workorderType: '',
      priority: '',
      equipmentName: '',
      remarks: '',
      dpFrom: '',
      timeFrom: '',
      dpTo: '',
      timeTo: ''
    };
    this.workorderselectionService.getWorkOrderTypeSelection()
      .pipe(first())
      .subscribe(workordertypeSelections => this.workordertypeSelections = workordertypeSelections);

    this.workorderselectionService.getAssignSelection()
      .pipe(first())
      .subscribe(assignSelections => this.assignSelections = assignSelections);

    this.workorderselectionService.getPrioritySelection()
      .pipe(first())
      .subscribe(prioritySelections => this.prioritySelections = prioritySelections);

    this.workorderselectionService.getNotificationSelection()
      .pipe(first())
      .subscribe(notificationSelections => this.notificationSelections = notificationSelections);

    this.itemsCount = 0;
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

  saveStep1(form: any) {
    const localworkorder = new WorkOrder();
    localworkorder.asignee_user_id = parseInt(form.value.asignee_user_id, 10);
    localworkorder.dt_start_planned = form.value.dpFrom.year + '-' + form.value.dpFrom.month + '-' + form.value.dpFrom.day + ' ' + form.value.timeFrom;
    localworkorder.dt_end_planned = form.value.dpTo.year + '-' + form.value.dpTo.month + '-' + form.value.dpTo.day + ' ' + form.value.timeTo;
    localworkorder.equipment_id = parseInt(form.value.equipment_id, 10);
    localworkorder.remarks = form.value.remarks;
    localworkorder.wo_name = form.value.wo_name;
    localworkorder.wo_priority_id = parseInt(form.value.wo_priority_id, 10);
    localworkorder.wo_type_id = parseInt(form.value.wo_type_id, 10);
    localworkorder.notification_id = parseInt(form.value.notification_id, 10);
    if (this.isEditModeMain === false) {
      localworkorder.id = 0;
      this.workorderService.addWorkOrder(localworkorder)
        .pipe(first())
        .subscribe(returnObj => {
          this.workorderSet = true;
          this.woId = Number(returnObj);
          this.isEditModeMain = true;
        });
    } else {
      localworkorder.id = this.woId;
      this.workorderSet = true;
      this.workorderService.updateWorkOrder(localworkorder)
        .pipe(first())
        .subscribe(returnObj => {
        });
    }
  }

  gotoList() {
    this.router.navigate(['/workorder/workorderlist']);
  }

  public onOptionsEquipmentSelected(event) {
    const value = event.target.value;
    // Fetch All PartEquipment on Page load
    if (value === 'Select Equipment') {
      this.dataSourcePart = new MatTableDataSource(null);
      this.dataSourcePart.paginator = null;
      this.selectedEquipmentId = null;
    }
    else {
      this.partEquipmentService.GetEquipmentPartList(value)
        .pipe(first())
        .subscribe(workorderParts => {
          this.dataSourcePart = new MatTableDataSource(workorderParts);
          this.dataSourcePart.paginator = this.paginator;
          this.selectedEquipmentId = parseInt(value, 10);

          if (this.selectedCategoryId !== null) {
            this.workorderselectionService.getTaskSelection(this.woId, this.selectedEquipmentId, this.selectedCategoryId)
              .pipe(first())
              .subscribe(returnObj => {
                this.items = this.getItems(returnObj);
              });
          }
        });
    }
  }

  public onOptionsCategorySelected(event) {
    const value = event.target.value;
    // Fetch All Category on Page load
    if (value === 'Select Category') {
      this.dataSourcePart = new MatTableDataSource(null);
      this.dataSourcePart.paginator = null;
      this.selectedCategoryId = null;
    }
    else {
      this.partEquipmentService.GetEquipmentPartList(value)
        .pipe(first())
        .subscribe(workorderParts => {
          this.dataSourcePart = new MatTableDataSource(workorderParts);
          this.dataSourcePart.paginator = this.paginator;
          this.selectedCategoryId = parseInt(value, 10);

          if (this.selectedEquipmentId !== null) {
            this.workorderselectionService.getTaskSelection(this.woId, this.selectedEquipmentId, this.selectedCategoryId)
              .pipe(first())
              .subscribe(returnObj => {
                this.items = this.getItems(returnObj);
              });
          }
        });
    }
  }

  getItems(parentChildObj) {
    let itemsArray = [];
    Object.keys(parentChildObj).forEach(function (key) {
      itemsArray.push(new TreeviewItem(parentChildObj[key]));
    });
    return itemsArray;
  }

  openDialog(this, btnName) {
    let x = document.getElementById(btnName).getAttribute("title");
    var splitted = x.split(',', 3);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = splitted;
    let dialogRef = this.dialog.open(WorkOrderSubTaskFileComponent, {
      data: { woid: splitted[0], task_sub_id: splitted[1], upload_type: splitted[2] },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngAfterViewChecked() {
    for (let i = 0; i < this.itemsCount; i++) {
      let elemBefore = this.elementRef.nativeElement.querySelector('#btnBefore' + i);
      if (!elemBefore.hasAttribute('listener')) {
        this.elementRef.nativeElement.querySelector('#btnBefore' + i).setAttribute('listener', 'true');
        this.elementRef.nativeElement.querySelector('#btnBefore' + i).addEventListener('click', this.openDialog.bind(this, 'btnBefore' + i));
      }
      let elemAfter = this.elementRef.nativeElement.querySelector('#btnAfter' + i);
      if (!elemAfter.hasAttribute('listener')) {
        this.elementRef.nativeElement.querySelector('#btnAfter' + i).setAttribute('listener', 'true');
        this.elementRef.nativeElement.querySelector('#btnAfter' + i).addEventListener('click', this.openDialog.bind(this, 'btnAfter' + i));
      }
    }
  }
}


