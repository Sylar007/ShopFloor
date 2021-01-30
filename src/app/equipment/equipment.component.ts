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
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  id: string;
  scannerEquipment: EquipmentScanner;
  equipmentFields: EquipmentField[] = [];
  equipmentField: EquipmentField;

  partEquipments: PartEquipment[] = [];
  partEquipment: PartEquipment;

  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;

  dataSource = new MatTableDataSource();
  dataSourcePart = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'field_value', 'actions'];
  displayedPartColumns: string[] = ['part_name', 'part_code', 'serial_no', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private scannerService: ScannerService,
    private equipmentService: EquipmentService,
    private partEquipmentService: PartEquipmentService
  ) {
    this.equipmentField = {} as EquipmentField;
    this.partEquipment = {} as PartEquipment;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['serialNo'];

    this.scannerService.openEquipment(this.id)
      .pipe(first())
      .subscribe(x => {
        this.scannerEquipment = x;
        // Fetch All EquipmentField on Page load
        this.equipmentService.getEquipmentField(this.scannerEquipment.id)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSource.data = equipmentFields);

        // Fetch All PartEquipment on Page load
        this.partEquipmentService.GetEquipmentPartList(this.scannerEquipment.id)
          .pipe(first())
          .subscribe(partEquipments => this.dataSourcePart.data = partEquipments);
      });
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;
    this.dataSourcePart.paginator = this.paginator;
  }
  editItem(element) {
    this.equipmentField = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.fieldForm.resetForm();
  }

  deleteItem(id) {
    this.equipmentService.deleteEquipmentField(id)
      .subscribe(data => {
        this.equipmentService.getEquipmentField(this.id)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSource.data = equipmentFields);
      });
  }

  addStudent() {
    this.equipmentService.createEquipmentField(this.fieldForm.value)
      .pipe(first())
      .subscribe(data => {
        this.equipmentService.getEquipmentField(this.id)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSource.data = equipmentFields);
        this.cancelEdit();
      });
  }

  updateStudent() {
    this.equipmentService.updateEquipmentField(this.equipmentField)
      .pipe(first())
      .subscribe(data => {
        this.equipmentService.getEquipmentField(this.id)
          .pipe(first())
          .subscribe(equipmentFields => this.dataSource.data = equipmentFields);
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
