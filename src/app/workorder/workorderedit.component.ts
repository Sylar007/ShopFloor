import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderSelectionService, PartEquipmentService, WorkOrderService, ScannerService } from '../_services';
import { FormBuilder, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderSelection, WorkOrderTypeSelection, AssignSelection, PrioritySelection, NotificationSelection, WorkOrder, EventModel } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
  templateUrl: './workorderedit.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderEditComponent implements OnInit, AfterViewChecked {
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
  prioritySelections: PrioritySelection[] = [];
  notificationSelections: NotificationSelection[] = [];
  workorderParts: WorkOrderPart[] = [];
  workorderPart: WorkOrderPart;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  selectUndefinedOptionValue: string;
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'serial_no'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  woId: number;
  fileType: string;
  itemsCount: number;

  // treeview start
  items: any;
  selectedEvents: Event;

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
    private scannerService: ScannerService,
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
    this.id = this.route.snapshot.params['workorderNo'];
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
    this.scannerService.editWorkOrder(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.orderName = x.wo_name;
        this.formInput.assignTo = x.asignee_user_id;
        this.formInput.notification_id = x.notification_id;
        this.formInput.equipmentName = x.equipment_id;
        this.formInput.workorderType = x.wo_type_id;
        this.formInput.priority = x.wo_priority_id;
        this.formInput.remarks = x.remarks;
        var dtStartPlanned = x.dt_start_planned.split('-');
        const vdtFrom: NgbDateStruct = { year: parseInt(dtStartPlanned[0], 10), month: parseInt(dtStartPlanned[1], 10), day: parseInt(dtStartPlanned[2], 10) };
        this.formInput.dpFrom = vdtFrom;
        var dtEndPlanned = x.dt_end_planned.split('-');
        const vdtTo: NgbDateStruct = { year: parseInt(dtEndPlanned[0], 10), month: parseInt(dtEndPlanned[1], 10), day: parseInt(dtEndPlanned[2], 10) };
        this.formInput.dpTo = vdtTo;
        this.formInput.timeFrom = x.timeFrom;
        this.formInput.timeTo = x.timeTo;
        this.woId = x.id;
        this.workorderSet = true;
        // Fetch All PartEquipment on Page load
        this.workorderService.getWorkOrderPart(this.id)
          .pipe(first())
          .subscribe(workorderParts => {
            this.dataSourcePart = new MatTableDataSource(workorderParts);
            this.dataSourcePart.paginator = this.paginator;
          });
        this.workorderselectionService.getTaskSelection(x.id, x.equipment_id, x.wo_type_id)
          .pipe(first())
          .subscribe(returnObj => {
            this.items = this.getItems(returnObj);
            this.itemsCount = this.items.length;
          });
      });

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
  }

  editItem(element) {
    this.workorderPart = _.cloneDeep(element);
  }

  cancelEdit() {
    this.fieldForm.resetForm();
  }

  getselectedItems(events) {
    this.selectedEvents = events;
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
    localworkorder.id = this.woId;
    this.workorderService.updateWorkOrder(localworkorder)
      .pipe(first())
      .subscribe(returnObj => {
      });
  }

  saveStep2() {
    let objEvents: EventModel[] = [];
    _.forEach(Object.values(this.selectedEvents), events => {
      console.log(events);

      let objEvent: EventModel = {
        id: '',
        url: ''
      };
      objEvent.id = events[0].id;
      objEvent.url = events[0].url;
      objEvents.push(objEvent);
    });
    console.log(objEvents);
    this.workorderService.updateTaskSubTree(this.woId, objEvents)
      .pipe(first())
      .subscribe(returnObj => {
      });
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
          this.selectedEquipmentId = value;

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
          this.selectedCategoryId = value;

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
    console.log(itemsArray);
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


