import { Component, OnInit, ViewChild } from '@angular/core';
import { PartTypeService } from '../_services';
import { first } from 'rxjs/operators';
import { PartType } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './parttypelist.component.html',
  styleUrls: ['./parttype.component.css']
})
export class PartTypeListComponent implements OnInit {
  parttypeLists: PartType[] = [];
  parttypeList: PartType;
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
    private parttypeService: PartTypeService
  ) { this.parttypeList = {} as PartType; }

  ngOnInit() {
    // Fetch All Part on Page load
    this.parttypeService.getPartTypeList()
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
    this.router.navigate(['/parttype/parttypeview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/parttype/parttypeedit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/parttype/parttypeadd/']);
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
