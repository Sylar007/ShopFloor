import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartModelService } from '../_services';
import { first } from 'rxjs/operators';
import { PartModel, PartModelField, PartTypeSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

export class FormInput {
  partName: any;
  partCode: any;
  partType: any;
  modelName: any;
  manufacture: any;
  modelNo: any;
  remarks: any;
  sales_contact_name: any;
  sales_contact_no: any;
  support_contact_name: any;
  support_contact_no: any;
}

export class FormInputField {
  id: any;
  part_model_id: any;
  name: any;
  field_value: any;
}

@Component({
  templateUrl: './partmodeledit.component.html',
  styleUrls: ['./partmodel.component.css']
})
export class PartModelEditComponent implements OnInit {
  formInput: FormInput;
  formInputField: FormInputField;
  form: any;
  isSubmit: boolean;
  id: string;
  partModel: PartModel;
  partFields: PartModelField[] = [];
  partField: PartModelField;
  dtRouterLinkOptions: any = {};
  parttypeSelections: PartTypeSelection[] = [];
  parttypeSelection: PartTypeSelection;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'field_value', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private partmodelService: PartModelService
  ) {
    this.partField = {} as PartModelField;
    this.parttypeSelection = {} as PartTypeSelection;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      partName: '',
      partCode: '',
      partType: '',
      modelName: '',
      manufacture: '',
      modelNo: '',
      remarks: '',
      sales_contact_name: '',
      sales_contact_no: '',
      support_contact_name: '',
      support_contact_no: '',
    };
    this.formInputField = {
      id: '',
      part_model_id: '',
      name: '',
      field_value: '',
    };
    this.partmodelService.getPartModelById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.partName = x.partName;
        this.formInput.partCode = x.partCode;
        this.formInput.partType = x.partTypeId;
        this.formInput.modelName = x.modelName;
        this.formInput.manufacture = x.manufacture;
        this.formInput.modelNo = x.modelNo;
        this.formInput.remarks = x.remarks;
        this.formInput.sales_contact_name = x.sales_contact_name;
        this.formInput.sales_contact_no = x.sales_contact_no;
        this.formInput.support_contact_name = x.support_contact_name;
        this.formInput.support_contact_no = x.support_contact_no;
        // Fetch All PartField on Page load
        this.partmodelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
      });
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
    this.partmodelService.getPartTypeSelection()
      .pipe(first())
      .subscribe(parttypeSelections => this.parttypeSelections = parttypeSelections);
  }
  editItem(element) {
    this.formInputField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  deleteItem(id) {
    this.partmodelService.deletePartModelField(id)
      .subscribe(data => {
        this.partmodelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
      });
  }

  addField(form: any) {
    form.value.part_model_id = parseInt(this.id, 10);
    this.partmodelService.createPartModelField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.partmodelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
        form.reset();
        this.cancelEdit();
      });
  }

  updateField(form: any) {
    form.value.part_model_id = parseInt(this.id, 10);
    form.value.id = this.formInputField.id;
    this.partmodelService.updatePartModelField(form.value)
      .pipe(first())
      .subscribe(data => {
        this.partmodelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
        form.reset();
        this.cancelEdit();
      });
  }

  saveStep1(form: any) {
    const localPartModel = new PartModel();
    localPartModel.partName = form.value.partName;
    localPartModel.partCode = form.value.partCode;
    localPartModel.partTypeId = parseInt(form.value.partType, 10);
    localPartModel.modelName = form.value.modelName;
    localPartModel.manufacture = form.value.manufacture;
    localPartModel.modelNo = form.value.modelNo;
    localPartModel.remarks = form.value.remarks;
    localPartModel.sales_contact_name = form.value.sales_contact_name;
    localPartModel.sales_contact_no = form.value.sales_contact_no;
    localPartModel.support_contact_name = form.value.support_contact_name;
    localPartModel.support_contact_no = form.value.support_contact_no;
    localPartModel.id = parseInt(this.id, 10);
    this.partmodelService.updatePartModel(localPartModel)
      .pipe(first())
      .subscribe(returnObj => {
      });
  }
}
