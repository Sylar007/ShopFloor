import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService, WorkOrderSelectionService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Part, CustomerSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  templateUrl: './partedit.component.html',
  styleUrls: ['./part.component.css']
})
export class PartEditComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  part: Part;
  isEditMode = false;
  customerSelections: CustomerSelection[] = [];
  customerSelection: CustomerSelection;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private workorderSelectionService : WorkOrderSelectionService
  ) { this.customerSelection = {} as CustomerSelection; }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
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
    this.partService.getPartById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.hil_code = x.hil_code;
        this.formInput.part_name = x.part_name;
        this.formInput.part_no = x.part_no;
        this.formInput.customer_name = x.customer_id;
        this.formInput.material_code = x.material_code;
        this.formInput.material_description = x.material_description;
        this.formInput.color = x.color;
        this.formInput.back_code = x.back_code;
        this.formInput.model = x.model;
        this.formInput.status = x.status;
      });

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
    localPart.id = parseInt(this.id, 10);

    this.partService.updatePart(localPart)
      .pipe(first())
      .subscribe(returnObj => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
