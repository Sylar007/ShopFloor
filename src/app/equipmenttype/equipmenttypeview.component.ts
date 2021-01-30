import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentTypeService } from '../_services';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EquipmentType } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

@Component({
  templateUrl: './equipmenttypeview.component.html',
  styleUrls: ['./equipmenttype.component.css']
})
export class EquipmentTypeViewComponent implements OnInit {
  id: string;
  equipmentType: EquipmentType;
  constructor(
    private route: ActivatedRoute,
    private equipmentTypeService: EquipmentTypeService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.equipmentTypeService.getEquipmentTypeById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.equipmentType = x;
      });
  }
}
