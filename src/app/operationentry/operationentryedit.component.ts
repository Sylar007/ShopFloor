import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentModelService, WorkOrderSelectionService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EquipmentModelField, EquipmentModelPart, EquipmentModel, EquipmentType } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class FormInput {
  equipmentName: any;
  equipmentType: any;
  processName: any;
  modelName: any;
  modelNo: any;
  manufacturer: any;
  sales_contact_name: any;
  sales_contact_no: any;
  support_contact_name: any;
  support_contact_no: any;
  remarks: any;
}

export class FormInputField {
  id: any;
  part_id: any;
  name: any;
  field_value: any;
}

@Component({
  templateUrl: './operationentryedit.component.html',
  styleUrls: ['./operationentry.component.css']
})
export class OperationEntryEditComponent implements OnInit {
  formInput: FormInput;
  formInputField: FormInputField;
  equipmentModelFields: EquipmentModelField[] = [];
  equipmentModelField: EquipmentModelField;
  equipmentModelParts: EquipmentModelPart[] = [];
  equipmentModelPart: EquipmentModelPart;
  equipmentTypeSelections: EquipmentType[] = [];
  equipmentTypeSelection: EquipmentType;
  form: any;
  isSubmit: boolean;
  id: string;
  dtRouterLinkOptions: any = {};

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'field_value', 'actions'];
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  equipmentModelId: number;
  equipmentSet: boolean;
  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private equipmentModelService: EquipmentModelService,
    private workOrderSelectionService: WorkOrderSelectionService
  ) {
    this.equipmentModelField = {} as EquipmentModelField;
    this.equipmentModelPart = {} as EquipmentModelPart;
    this.equipmentTypeSelection = {} as EquipmentType;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      equipmentName: '',
      equipmentType: '',
      processName: '',
      modelName: '',
      modelNo: '',
      manufacturer: '',
      sales_contact_name: '',
      sales_contact_no: '',
      support_contact_name: '',
      support_contact_no: '',
      remarks: '',
    };
    this.formInputField = {
      id: '',
      part_id: '',
      name: '',
      field_value: '',
    };
    this.equipmentModelService.getEquipmentModelById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.equipmentName = x.equipmentName;
        this.formInput.equipmentType = x.equipmentTypeId;
        this.formInput.processName = x.processName;
        this.formInput.modelName = x.modelName;
        this.formInput.modelNo = x.modelNo;
        this.formInput.manufacturer = x.manufacturer;
        this.formInput.remarks = x.remarks;
        this.formInput.sales_contact_name = x.sales_contact_name;
        this.formInput.sales_contact_no = x.sales_contact_no;
        this.formInput.support_contact_name = x.support_contact_name;
        this.formInput.support_contact_no = x.support_contact_no;
        this.formInput.remarks = x.remarks;
        this.equipmentModelId = x.id;
        this.equipmentSet = true;
        // Fetch All EquipmentModelField on Page load
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
        // Fetch All PartField on Page load
        this.equipmentModelService.getEquipmentModelPartList(this.id)
          .pipe(first())
          .subscribe(equipmentModelParts => this.dataSourcePart.data = equipmentModelParts);
        this.workOrderSelectionService.getEquipmentTypeSelection()
          .pipe(first())
          .subscribe(equipmentTypeSelections => this.equipmentTypeSelections = equipmentTypeSelections);
      });
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
  }
  editItem(element) {
    this.formInputField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  deleteItem(id) {
    this.equipmentModelService.deleteEquipmentModelField(id)
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
      });
  }

  addField(form: any) {
    form.value.equipment_model_id = this.equipmentModelId;
    this.equipmentModelService.createEquipmentModelField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
        form.reset();
        this.cancelEdit();
      });
  }

  updateField(form: any) {
    form.value.equipment_model_id = this.equipmentModelId;
    form.value.id = this.formInputField.id;
    this.equipmentModelService.updateEquipmentModelField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
        form.reset();
        this.cancelEdit();
      });
  }

  saveStep1(form: any) {
    const localEquipmentModel = new EquipmentModel();
    localEquipmentModel.id = this.equipmentModelId;
    localEquipmentModel.equipmentName = form.value.equipmentName;
    localEquipmentModel.equipmentTypeId = parseInt(form.value.equipmentType, 10);
    localEquipmentModel.processName = form.value.processName;
    localEquipmentModel.modelName = form.value.modelName;
    localEquipmentModel.modelNo = form.value.modelNo;
    localEquipmentModel.manufacturer = form.value.manufacturer;
    localEquipmentModel.sales_contact_name = form.value.sales_contact_name;
    localEquipmentModel.sales_contact_no = form.value.sales_contact_no;
    localEquipmentModel.support_contact_name = form.value.support_contact_name;
    localEquipmentModel.support_contact_no = form.value.support_contact_no;
    localEquipmentModel.remarks = form.value.remarks;
    this.equipmentModelService.updateEquipmentModel(localEquipmentModel)
      .pipe(first())
      .subscribe(returnObj => {
      });
  }
}
