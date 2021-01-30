import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService, WorkOrderSelectionService, UploadService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Part, CustomerSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

export class FormInput {
  hil_code: any;
  part_name: any;
  part_no: any;
  customer_name: any;
  material_code: any;
  material_description: any;
  color: any;
  back_code: any;
  model: any;
  status: any;
}

@Component({
  templateUrl: './partadd.component.html',
  styleUrls: ['./part.component.css']
})
export class PartAddComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: number;
  part: Part;
  selectedFiles: FileList;
  customerSelections: CustomerSelection[] = [];
  customerSelection: CustomerSelection;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private uploadService: UploadService,
    private workorderSelectionService: WorkOrderSelectionService
  ) { this.customerSelection = {} as CustomerSelection; }

  ngOnInit() {
    this.formInput = {
      hil_code: '',
      part_name: '',
      part_no: '',
      customer_name: '',
      material_code: '',
      material_description: '',
      color: '',
      back_code: '',
      model: '',
      status: ''
    };

    this.workorderSelectionService.getCustomerSelection()
      .pipe(first())
      .subscribe(customerSelections => this.customerSelections = customerSelections);

  }

  saveStep1(form: any) {
    const localPart = new Part();
    localPart.hil_code = form.value.hil_code;
    localPart.part_name = form.value.part_name;
    localPart.part_no = form.value.part_no;
    localPart.customer_id = parseInt(form.value.customer_id, 10);
    localPart.material_code = form.value.material_code;
    localPart.material_description = form.value.material_description;
    localPart.color = form.value.color;
    localPart.back_code = form.value.back_code;
    localPart.model = form.value.model;

    localPart.id = 0;
    this.partService.addPart(localPart)
      .pipe(first())
      .subscribe(returnObj => {
        this.id = Number(returnObj);
        this.uploadService.uploadPart(this.selectedFiles.item(0), this.id).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.router.navigate(['../'], { relativeTo: this.route });
            }
          },
          err => {
          });
      });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }
}
