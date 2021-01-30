import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentModelService } from '../_services';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EquipmentModel, EquipmentModelField, EquipmentModelPart } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './operationentryview.component.html',
  styleUrls: ['./operationentry.component.css']
})
export class OperationEntryViewComponent implements OnInit {
  id: string;
  equipmentmodel: EquipmentModel;
  equipmentModelFields: EquipmentModelField[] = [];
  equipmentModelField: EquipmentModelField;
  equipmentModelParts: EquipmentModelPart[] = [];
  equipmentModelPart: EquipmentModelPart;
  dtRouterLinkOptions: any = {};
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  equipmentModelId:number;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'field_value', 'actions'];
  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_name', 'part_code', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  equipmentSet: boolean;
  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private equipmentModelService: EquipmentModelService
  ) {
    this.equipmentModelField = {} as EquipmentModelField;
    this.equipmentModelPart = {} as EquipmentModelPart;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.equipmentModelId = parseInt(this.id,10);
    this.equipmentModelService.getEquipmentModelById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.equipmentmodel = x;
        this.equipmentSet = true;
        // Fetch All EquipmentModelField on Page load
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
         // Fetch All PartField on Page load
         this.equipmentModelService.getEquipmentModelPartList(this.id)
         .pipe(first())
         .subscribe(equipmentModelParts => this.dataSourcePart.data = equipmentModelParts);
      });
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
  }
  editItem(element) {
    this.equipmentModelField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fieldForm.resetForm();
  }

  deleteItem(id) {
    this.equipmentModelService.deleteEquipmentModelField(id)
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(equipmentModelFields => this.dataSource.data = equipmentModelFields);
      });
  }

  addStudent() {
    this.equipmentModelService.createEquipmentModelField(this.fieldForm.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
        this.cancelEdit();
      });
  }

  updateStudent() {
    this.equipmentModelService.updateEquipmentModelField(this.equipmentmodel)
      .pipe(first())
      .subscribe(data => {
        this.equipmentModelService.getEquipmentModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
        this.cancelEdit();
      });
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
}
