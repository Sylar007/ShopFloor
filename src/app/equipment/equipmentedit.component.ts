import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderSelectionService, PartEquipmentService, ScannerService, EquipmentService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderSelection, WorkOrderTypeSelection, PrioritySelection, ModelSelection, StatusSelection, Equipment, PartEquipment, EquipmentField } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

export class FormInputField {
  id: any;
  equipment_id: any;
  name: any;
  field_value: any;
}

@Component({
  templateUrl: './equipmentedit.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentEditComponent implements OnInit {
  formInput: FormInput;
  formInputField: FormInputField;
  isSubmit: boolean;
  id: string;
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
  equipmentFields: EquipmentField[] = [];
  equipmentField: EquipmentField;
  selectUndefinedOptionValue: string;
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'serial_no'];

  dataSourceField = new MatTableDataSource();
  displayedSpecColumns: string[] = ['name', 'field_value', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  isEditMode = false;
  equipmentId: number;
  equipmentSet: boolean;
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
    private route: ActivatedRoute,
    private partEquipmentService: PartEquipmentService,
    private workorderselectionService: WorkOrderSelectionService,
    private scannerService: ScannerService,
    private equipmentService: EquipmentService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.workorderPart = {} as WorkOrderPart;
    this.modelSelection = {} as ModelSelection;
    this.statusSelection = {} as StatusSelection;
    this.selectedEquipmentId = null;
    this.selectedCategoryId = null;
    this.equipmentField = {} as EquipmentField;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['equipment_no'];
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
    this.formInputField = {
      id: '',
      equipment_id: '',
      name: '',
      field_value: '',
    };

    this.scannerService.editEquipment(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.id = x.id;
        this.formInput.model_name = x.model_id;
        this.formInput.status_name = x.status_id;
        this.formInput.serial_no = x.serial_no;
        this.formInput.manufacture_year = x.manufacture_year;
        this.formInput.sales_name = x.sales_name;
        this.formInput.sales_no = x.sales_no;
        this.formInput.support_no = x.support_no;
        this.formInput.support_name = x.support_name;

        var dtacquisition = x.acquisitionDate.split('-');
        const vdtacquisition: NgbDateStruct = { year: parseInt(dtacquisition[0], 10), month: parseInt(dtacquisition[1], 10), day: parseInt(dtacquisition[2], 10) };
        this.formInput.acquisitionDate = vdtacquisition;

        var dtcommissioning = x.commissioningDate.split('-');
        const vdtcommissioning: NgbDateStruct = { year: parseInt(dtcommissioning[0], 10), month: parseInt(dtcommissioning[1], 10), day: parseInt(dtcommissioning[2], 10) };
        this.formInput.commissioningDate = vdtcommissioning;

        var dtwarranty = x.warrantyDate.split('-');
        const vdtwarranty: NgbDateStruct = { year: parseInt(dtwarranty[0], 10), month: parseInt(dtwarranty[1], 10), day: parseInt(dtwarranty[2], 10) };
        this.formInput.warrantyDate = vdtwarranty;

        var dtdelivery = x.deliveryDate.split('-');
        const vdtdelivery: NgbDateStruct = { year: parseInt(dtdelivery[0], 10), month: parseInt(dtdelivery[1], 10), day: parseInt(dtdelivery[2], 10) };
        this.formInput.deliveryDate = vdtdelivery;

        var dtinstallation = x.installationDate.split('-');
        const vdtinstallation: NgbDateStruct = { year: parseInt(dtinstallation[0], 10), month: parseInt(dtinstallation[1], 10), day: parseInt(dtinstallation[2], 10) };
        this.formInput.installationDate = vdtinstallation;

        this.equipmentId = x.id;
        this.equipmentSet = true;
        // Fetch All EquipmentField on Page load
        this.equipmentService.getEquipmentField(this.equipmentId)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSourceField.data = equipmentFields);

        // Fetch All PartEquipment on Page load
        this.partEquipmentService.GetEquipmentPartList(this.equipmentId)
          .pipe(first())
          .subscribe(partEquipments => this.dataSourcePart.data = partEquipments);
      });

    this.workorderselectionService.getModelSelection()
      .pipe(first())
      .subscribe(modelSelections => this.modelSelections = modelSelections);

    this.workorderselectionService.getStatusSelection()
      .pipe(first())
      .subscribe(statusSelections => this.statusSelections = statusSelections);
  }

  editItem(element) {
    this.formInputField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  deleteItem(id) {
    this.equipmentService.deleteEquipmentField(id)
    .subscribe(data => {
      this.equipmentService.getEquipmentField(this.equipmentId)
        .pipe(first())
        .subscribe(equipmentFields => this.dataSourceField.data = equipmentFields);
    });
  }

  addField(form: any) {
    form.value.equipment_id = this.equipmentId;
    this.equipmentService.createEquipmentField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentService.getEquipmentField(this.equipmentId)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSourceField.data = equipmentFields);
        form.reset();
        this.cancelEdit();
      });
  }

  updateField(form: any) {
    form.value.equipment_id = this.equipmentId;
    form.value.id = this.formInputField.id;
    this.equipmentService.updateEquipmentField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentService.getEquipmentField(this.equipmentId)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSourceField.data = equipmentFields);
        form.reset();
        this.cancelEdit();
      });
  }
  saveStep1(form: any) {
    const localEquipment = new Equipment();
    localEquipment.model_id = parseInt(form.value.model_name, 10);
    localEquipment.acquisitionDate = form.value.acquisitionDate.year + '-' + form.value.acquisitionDate.month + '-' + form.value.acquisitionDate.day;
    localEquipment.commissioningDate = form.value.commissioningDate.year + '-' + form.value.commissioningDate.month + '-' + form.value.commissioningDate.day;
    localEquipment.deliveryDate = form.value.deliveryDate.year + '-' + form.value.deliveryDate.month + '-' + form.value.deliveryDate.day;
    localEquipment.installationDate = form.value.installationDate.year + '-' + form.value.installationDate.month + '-' + form.value.installationDate.day;
    if (form.value.manufacture_year === '') {
      localEquipment.manufacture_year = 0
    }
    else {
      localEquipment.manufacture_year = parseInt(form.value.manufacture_year, 10);
    }
    localEquipment.sales_name = form.value.sales_name;
    localEquipment.sales_no = form.value.sales_no;
    localEquipment.serial_no = form.value.serial_no;
    localEquipment.status_id = parseInt(form.value.status_name, 10);
    localEquipment.support_name = form.value.support_name;
    localEquipment.support_no = form.value.support_no;
    localEquipment.warrantyDate = form.value.warrantyDate.year + '-' + form.value.warrantyDate.month + '-' + form.value.warrantyDate.day;

    localEquipment.id = this.equipmentId;
    this.equipmentService.updateEquipment(localEquipment)
      .pipe(first())
      .subscribe(returnObj => {
      });
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
