import { Component, OnInit, ViewChild } from '@angular/core';
import { PartService } from '../_services';
import { first } from 'rxjs/operators';
import { PartList } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { MatSort } from '@angular/material/sort';

@Component({
  templateUrl: './partlist.component.html',
  styleUrls: ['./part.component.css']
})
export class PartListComponent implements OnInit {
  partLists: PartList[] = [];
  partList: PartList;
  selectedRowIndex = -1;
  selectedPartId = null;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['hil_code', 'part_name', 'part_no', 'material_code', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isEditMode = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService
  ) { this.partList = {} as PartList; }

  ngOnInit() {
    // Fetch All Part on Page load
    this.partService.getPartList()
      .pipe(first())
      .subscribe(partLists => {
        this.dataSource = new MatTableDataSource(partLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  openPart(id) {
    this.router.navigate(['/part/partview/', id]);
  }

  editPart(id) {
    if (id !== null) {
      this.router.navigate(['/part/partedit/', id]);
    }
  }

  addPart() {
    this.router.navigate(['/part/partadd']);
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
