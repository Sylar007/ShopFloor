import { Component, OnInit, ViewChild } from '@angular/core';
import { PartModelService } from '../_services';
import { first } from 'rxjs/operators';
import { PartModelList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './partmodellist.component.html',
  styleUrls: ['./partmodel.component.css']
})
export class PartModelListComponent implements OnInit {
  partmodelLists: PartModelList[] = [];
  partmodelList: PartModelList;
  selectedRowIndex = -1;
  selectedPartId = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['partName', 'partCode', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partmodelService: PartModelService
  ) { this.partmodelList = {} as PartModelList; }

  ngOnInit() {
    // Fetch All Part on Page load
    this.partmodelService.getPartModelList()
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
    this.router.navigate(['/partmodel/partmodelview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/partmodel/partmodeledit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/partmodel/partmodeladd/']);
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
