import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartModelService } from '../_services';
import { FormBuilder, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PartModel, PartField } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './partmodelview.component.html',
  styleUrls: ['./partmodel.component.css']
})
export class PartModelViewComponent implements OnInit {
  id: string;
  partModel: PartModel;
  partFields: PartField[] = [];
  partField: PartField;
  dtRouterLinkOptions: any = {};
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'field_value', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private partModelService: PartModelService
  ) { this.partField = {} as PartField; }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.partModelService.getPartModelById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.partModel = x;
        // Fetch All PartField on Page load
        this.partModelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
      });
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
  }
  editItem(element) {
    this.partField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fieldForm.resetForm();
  }

  deleteItem(id) {
    this.partModelService.deletePartModelField(id)
      .subscribe(data => {
        this.partModelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
      });
  }

  addStudent() {
    this.partModelService.createPartModelField(this.fieldForm.value)
      .pipe(first())
      .subscribe(data => {
        this.partModelService.getPartModelFieldList(this.id)
          .pipe(first())
          .subscribe(partFields => this.dataSource.data = partFields);
        this.cancelEdit();
      });
  }

  updateStudent() {
    this.partModelService.updatePartModelField(this.partField)
      .pipe(first())
      .subscribe(data => {
        this.partModelService.getPartModelFieldList(this.id)
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
