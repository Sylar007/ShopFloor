import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScannerService, WorkOrderService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { WorkOrderPart, WorkOrderScanner } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkOrderComponent implements OnInit {
  id: string;
  scannerWorkOrder: WorkOrderScanner;
  workorderParts: WorkOrderPart[] = [];
  workorderPart: WorkOrderPart;
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;

  dataSourcePart = new MatTableDataSource();
  displayedPartColumns: string[] = ['part_id', 'part_name', 'part_code', 'serial_no', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private scannerService: ScannerService,
    private workorderService: WorkOrderService
  ) { this.workorderPart = {} as WorkOrderPart; }

  ngOnInit() {
    this.id = this.route.snapshot.params['workorderNo'];

    this.scannerService.openWorkOrder(this.id)
      .pipe(first())
      .subscribe(x => {
        this.scannerWorkOrder = x;
        console.log(this.scannerWorkOrder);

        // Fetch All PartEquipment on Page load
        this.workorderService.getWorkOrderPart(this.id)
          .pipe(first())
          .subscribe(workorderParts => {
            //this.dataSourcePart.data = workorderParts;
            this.dataSourcePart = new MatTableDataSource(workorderParts);
            this.dataSourcePart.paginator = this.paginator;
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
