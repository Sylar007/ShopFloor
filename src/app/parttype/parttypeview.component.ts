import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartTypeService } from '../_services';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PartType } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './parttypeview.component.html',
  styleUrls: ['./parttype.component.css']
})
export class PartTypeViewComponent implements OnInit {
  id: string;
  partType: PartType;
  constructor(
    private route: ActivatedRoute,
    private partTypeService: PartTypeService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.partTypeService.getPartTypeById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.partType = x;
      });
  }
}
