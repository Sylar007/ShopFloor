import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderSelectionService, PartEquipmentService, WorkOrderService, EquipmentService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderSelection, WorkOrderTypeSelection, PrioritySelection, WorkOrder, ModelSelection, StatusSelection, Equipment } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

export class FormInput {
  id: any;
  model_name: any;
  status_name: any;
  serial_no: any;
  manufacture_year: any;
  acquisitionDate: any;
  warrantyDate: any;
  deliveryDate: any;
  installationDate: any;
  commissioningDate: any;
  sales_name: any;
  sales_no: any;
  support_name: any;
  support_no: any;
}

@Component({
  templateUrl: './equipmentadd.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentAddComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  equipmentSet: boolean;
  selectedEquipmentId: number;
  selectedCategoryId: number;
  workorderSelection: WorkOrderSelection;
  statusSelections: StatusSelection[] = [];
  statusSelection: StatusSelection;
  workordertypeSelections: WorkOrderTypeSelection[] = [];
  modelSelections: ModelSelection[] = [];
  modelSelection: ModelSelection;
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
  equipmentId: number;

  // treeview start
  items: any;

  config: TreeviewConfig = {
    hasAllCheckBox: true,
    hasFilter: false,
    hasCollapseExpand: true,
    decoupleChildFromParent: true,
    maxHeight: 500,
    hasDivider: true
  };
  // treeview end

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private partEquipmentService: PartEquipmentService,
    private workorderselectionService: WorkOrderSelectionService,
    private equipmentService: EquipmentService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.workorderPart = {} as WorkOrderPart;
    this.modelSelection = {} as ModelSelection;
    this.statusSelection = {} as StatusSelection;
    this.selectedEquipmentId = null;
    this.selectedCategoryId = null;
  }

  ngOnInit() {
    this.formInput = {
      id: '',
      model_name: '',
      status_name: '',
      serial_no: '',
      manufacture_year: '',
      acquisitionDate: '',
      warrantyDate: '',
      deliveryDate: '',
      installationDate: '',
      commissioningDate: '',
      sales_name: '',
      sales_no: '',
      support_name: '',
      support_no: '',
    };

    this.workorderselectionService.getModelSelection()
      .pipe(first())
      .subscribe(modelSelections => this.modelSelections = modelSelections);

    this.workorderselectionService.getStatusSelection()
      .pipe(first())
      .subscribe(statusSelections => this.statusSelections = statusSelections);
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

  saveStep1(form: any) {
    this.formInput = {
      id: '',
      model_name: '',
      status_name: '',
      serial_no: '',
      manufacture_year: '',
      acquisitionDate: '',
      warrantyDate: '',
      deliveryDate: '',
      installationDate: '',
      commissioningDate: '',
      sales_name: '',
      sales_no: '',
      support_name: '',
      support_no: '',
    };
    const localEquipment = new Equipment();
    localEquipment.model_id = parseInt(form.value.model_name, 10);
    localEquipment.acquisitionDate = form.value.acquisitionDate.year + '-' + form.value.acquisitionDate.month + '-' + form.value.acquisitionDate.day;
    localEquipment.commissioningDate = form.value.commissioningDate.year + '-' + form.value.commissioningDate.month + '-' + form.value.commissioningDate.day;
    localEquipment.deliveryDate = form.value.deliveryDate.year + '-' + form.value.deliveryDate.month + '-' + form.value.deliveryDate.day;
    localEquipment.installationDate = form.value.installationDate.year + '-' + form.value.installationDate.month + '-' + form.value.installationDate.day;
    if (form.value.manufacture_year === '')
    {
      localEquipment.manufacture_year = 0;
    }
    else
    {
      localEquipment.manufacture_year = parseInt(form.value.manufacture_year, 10);
    }

    localEquipment.sales_name = form.value.sales_name;
    localEquipment.sales_no = form.value.sales_no;
    localEquipment.serial_no = form.value.serial_no;
    localEquipment.status_id = parseInt(form.value.status_name, 10);
    localEquipment.support_name = form.value.support_name;
    localEquipment.support_no = form.value.support_no;
    localEquipment.warrantyDate = form.value.warrantyDate.year + '-' + form.value.warrantyDate.month + '-' + form.value.warrantyDate.day;

    if (this.isEditModeMain === false) {
      localEquipment.id = 0;
      this.equipmentService.addEquipment(localEquipment)
        .pipe(first())
        .subscribe(returnObj => {
          this.equipmentSet = true;
          this.equipmentId = Number(returnObj);
          this.isEditModeMain = true;
        });
    } else {
      localEquipment.id = this.equipmentId;
      this.equipmentSet = true;
      this.equipmentService.updateEquipment(localEquipment)
        .pipe(first())
        .subscribe(returnObj => {
        });
    }
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
            // this.workorderselectionService.getTaskSelection(this.selectedEquipmentId, this.selectedCategoryId)
            //   .pipe(first())
            //   .subscribe(returnObj => {
            //     this.items = this.getItems(returnObj);
            //   });
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
            // this.workorderselectionService.getTaskSelection(this.selectedEquipmentId, this.selectedCategoryId)
            //   .pipe(first())
            //   .subscribe(returnObj => {
            //     this.items = this.getItems(returnObj);
            //   });
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

}


