import { ChangeDetectorRef, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderSelectionService, PartEquipmentService, ScannerService, EquipmentService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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

@Component({
  templateUrl: './equipmentview.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentViewComponent implements OnInit {
  formInput: FormInput;
  form: any;
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
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
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
    private formBuilder: FormBuilder,
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

    this.scannerService.editEquipment(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.id = x.id;
        this.formInput.serial_no = x.serial_no;
        this.formInput.manufacture_year = x.manufacture_year;
        this.formInput.sales_name = x.sales_name;
        this.formInput.sales_no = x.sales_no;
        this.formInput.support_no = x.support_no;
        this.formInput.support_name = x.support_name;

        this.formInput.acquisitionDate = x.acquisitionDate;
        this.formInput.commissioningDate = x.commissioningDate;
        this.formInput.warrantyDate = x.warrantyDate;
        this.formInput.deliveryDate = x.deliveryDate;
        this.formInput.installationDate = x.installationDate;

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

        this.workorderselectionService.getModelSelectionById(x.model_id)
          .pipe(first())
          .subscribe(y => {
            this.formInput.model_name = y.model_name;
          });

        this.workorderselectionService.getStatusSelectionById(x.status_id)
          .pipe(first())
          .subscribe(y => {
            this.formInput.status_name = y.name;
          });
      });
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

}
