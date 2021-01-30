import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentModelService } from '../_services';
import { first } from 'rxjs/operators';
import { EquipmentModelList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './operationentrylist.component.html',
  styleUrls: ['./operationentry.component.css']
})
export class OperationEntryListComponent implements OnInit {
  equipmentmodelLists: EquipmentModelList[] = [];
  equipmentmodelList: EquipmentModelList;
  selectedRowIndex = -1;
  selectedPartId = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['equipmentName', 'processName', 'manufacturer','modelName'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmentmodelService: EquipmentModelService
  ) { this.equipmentmodelList = {} as EquipmentModelList; }

  ngOnInit() {
    // Fetch All Equipment on Page load
    this.equipmentmodelService.getEquipmentModelList()
      .pipe(first())
      .subscribe(equipmentmodelLists => {
        this.dataSource = new MatTableDataSource(equipmentmodelLists);
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

  onSubmit() {

  }

  openPart(id) {
    this.router.navigate(['/equipmentmodel/equipmentmodelview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/equipmentmodel/equipmentmodeledit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/equipmentmodel/equipmentmodeladd/']);
  }

  highlight(row) {
    if (this.selectedRowIndex === row.id) {
      this.selectedPartId = null;
      this.selectedRowIndex = -1;
    }
    else {
      this.selectedPartId = row.id;
      this.selectedRowIndex = row.id;
    }
  }

}
