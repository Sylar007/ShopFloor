import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentService } from '../_services';
import { first } from 'rxjs/operators';
import { EquipmentList, WorkOrderList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './equipmentlist.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipmentLists: EquipmentList[] = [];
  equipmentList: EquipmentList;
  @ViewChild('fieldForm', { static: false })
  selectedRowIndex = -1;
  selectedEquipmentNo = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['equipment_no', 'model_no', 'equipment_name_model_name', 'serial_no',
    'location'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmentService: EquipmentService
  ) { this.equipmentList = {} as EquipmentList; }

  ngOnInit() {
    // Fetch All Equipment on Page load
    this.equipmentService.openEquipmentList()
      .pipe(first())
      .subscribe(workorderLists => {
        this.dataSource = new MatTableDataSource(workorderLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  editItem(element) {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
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

  }

  openEquipment(equipment_no) {
    this.router.navigate(['/equipment/equipmentview/', equipment_no]);
  }

  editEquipment(equipment_no) {
    if (equipment_no !== null) {
      this.router.navigate(['/equipment/equipmentedit/', equipment_no]);
    }
  }

  logEquipment(equipment_no) {
    this.router.navigate(['/equipment/equipmentlog/', equipment_no]);
  }

  addEquipment() {
    this.router.navigate(['/equipment/equipmentadd']);
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedEquipmentNo = null;
      this.selectedRowIndex = -1;
    }
    else {
      this.selectedEquipmentNo = row.equipment_no;
      this.selectedRowIndex = row.id;
    }
  }

}
