import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExecutionService, WorkOrderSelectionService, WorkOrderService } from '../_services';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AssignSelection, EventModel, Execution, WorkOrderPart, WoStatusSelection, WOExecution } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WorkOrderSubTaskFileComponent } from '../workorder/workordersubtaskfile.component';

export class FormInput {
  woNo: any;
  status: any;
  action: any;
  status_name: any;
  assignTo: any;
  dateFinish: any;
}

@Component({
  templateUrl: './workexecution.component.html',
  styleUrls: ['./workexecution.component.css']
})
export class WorkExecutionComponent implements OnInit, AfterViewChecked {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  workorderSet: boolean;
  selectedEquipmentId: number;
  selectedCategoryId: number;
  assignSelections: AssignSelection[] = [];
  assignSelection: AssignSelection;
  wostatusSelections: WoStatusSelection[] = [];
  wostatusSelection: WoStatusSelection;
  workorderParts: WorkOrderPart[] = [];
  workorderPart: WorkOrderPart;
  woExecution: Execution;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  selectUndefinedOptionValue: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  woId: number;
  fileType: string;
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'serial_no'];
  itemsCount: number;
  // treeview start
  items: any;
  selectedEvents: Event;
  extra: boolean;

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
    private executionService: ExecutionService,
    private workorderService: WorkOrderService,
    private workorderselectionService: WorkOrderSelectionService,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {
    this.woExecution = {} as Execution;
    this.assignSelection = {} as AssignSelection;
    this.workorderPart = {} as WorkOrderPart;
    this.wostatusSelection = {} as WoStatusSelection;
    this.extra = true;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      woNo: '',
      status: '',
      action: '',
      status_name: '',
      assignTo: '',
      dateFinish: '',
    };
    this.executionService.getExecutionById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.id = String(x.id);
        this.formInput.woNo = x.woNo;
        this.formInput.assignTo = x.assignTo;
        this.formInput.action = x.action;
        this.formInput.status = x.status;
        this.formInput.status_name = x.name;
        if (x.name === 'Select Status' || x.name === 'Approval' || x.name === 'Reassign'
          || x.name === 'Verification') {
          this.extra = true
        }
        else {
          this.extra = false
        }
        this.workorderSet = true;
        if (x.dateFinish !== null) {
          var dtFinish = x.dateFinish.split('-');
          const vdtFinish: NgbDateStruct = { year: parseInt(dtFinish[0], 10), month: parseInt(dtFinish[1], 10), day: parseInt(dtFinish[2], 10) };
          this.formInput.dateFinish = vdtFinish;
        }
        // Fetch All PartEquipment on Page load
        this.workorderService.getPartByWorkId(parseInt(this.id, 10))
          .pipe(first())
          .subscribe(workorderParts => {
            this.dataSourcePart = new MatTableDataSource(workorderParts);
            this.dataSourcePart.paginator = this.paginator;
          });
        this.workorderselectionService.getWOTaskSelection(x.id, x.equipment_id, x.wo_type_id)
          .pipe(first())
          .subscribe(returnObj => {
            this.items = this.getItems(returnObj);
            this.itemsCount = this.items.length;
          });
      });

    this.workorderselectionService.getAssignSelection()
      .pipe(first())
      .subscribe(assignSelections => this.assignSelections = assignSelections);

    this.workorderselectionService.getWoStatusSelection()
      .pipe(first())
      .subscribe(wostatusSelections => this.wostatusSelections = wostatusSelections);
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
    const localexecution = new WOExecution();
    localexecution.id = parseInt(this.id, 10);
    localexecution.action = form.value.action;
    localexecution.status_id = parseInt(form.value.status_name, 10);
    if (this.extra == true)
    {
      localexecution.assign_user =  parseInt(form.value.asignee_user_id, 10);
      localexecution.dateFinish = form.value.dateFinish.year + '-' + form.value.dateFinish.month + '-' + form.value.dateFinish.day;
    }
    this.executionService.updateWoExecution(localexecution)
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
    this.workorderService.updateTaskExecutionSubTree(parseInt(this.id, 10), objEvents)
      .pipe(first())
      .subscribe(returnObj => {
      });
  }

  public onOptionsStatusSelected(event) {
    let selectedOptions = event.target['options'];
    let selectedIndex = selectedOptions.selectedIndex;
    let value = selectedOptions[selectedIndex].text;
    // Fetch All PartEquipment on Page load
    if (value === 'Select Status' || value === 'Approval' || value === 'Reassign'
      || value === 'Verification') {
      this.extra = true
    }
    else {
      this.extra = false
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


