import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentTypeService } from '../_services';
import { first } from 'rxjs/operators';
import { EquipmentType } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './equipmenttypelist.component.html',
  styleUrls: ['./equipmenttype.component.css']
})
export class EquipmentTypeListComponent implements OnInit {
  equipmenttypeLists: EquipmentType[] = [];
  equipmenttypeList: EquipmentType;
  selectedRowIndex = -1;
  selectedPartId = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmenttypeService: EquipmentTypeService
  ) { this.equipmenttypeList = {} as EquipmentType; }

  ngOnInit() {
    // Fetch All Part on Page load
    this.equipmenttypeService.getEquipmentTypeList()
      .pipe(first())
      .subscribe(partmodelLists => {
        this.dataSource = new MatTableDataSource(partmodelLists);
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
    this.router.navigate(['/equipmenttype/equipmenttypeview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/equipmenttype/equipmenttypeedit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/equipmenttype/equipmenttypeadd/']);
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
