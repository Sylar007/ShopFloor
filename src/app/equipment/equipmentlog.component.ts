import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScannerService, EquipmentService, PartEquipmentService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EquipmentScanner, EquipmentField, PartEquipment } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './equipmentlog.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentLogComponent implements OnInit {
  id: string;
  equipmentSet: boolean;
  equipmentId: number;
  scannerEquipment: EquipmentScanner;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private scannerService: ScannerService,
    private equipmentService: EquipmentService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['equipment_no'];

    this.equipmentService.openEquipment(this.id)
      .pipe(first())
      .subscribe(x => {
        this.scannerEquipment = x;
        this.equipmentId = this.scannerEquipment.id;
        this.equipmentSet = true;
      });
  }
  editItem(element) {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fieldForm.resetForm();
  }

  deleteItem(id) {
  }

  addStudent() {
  }

  updateStudent() {
  }

  onSubmit() {
  }
}
