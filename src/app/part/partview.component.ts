import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartService, UploadService } from '../_services';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Part, PartField } from '../_models';
import * as _ from 'lodash';

@Component({
  templateUrl: './partview.component.html',
  styleUrls: ['./part.component.css']
})
export class PartViewComponent implements OnInit {
  id: string;
  part: Part;
  partFields: PartField[] = [];
  partField: PartField;
  dtRouterLinkOptions: any = {};
  @ViewChild('fieldForm', { static: false })
  fieldForm: NgForm;
  imageWidth: number = 90;
  imageMargin: number = 3;
  imageUrl : any;
  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private uploadService: UploadService
  ) { this.partField = {} as PartField; }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.partService.getPartById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.part = x;
        this.viewFile(x.id)
      });
  }
  saveStep1() {
        this.router.navigate(['../../'], { relativeTo: this.route });
  }
  viewFile(id) {
    this.uploadService.viewFile(id)
      .pipe(first())
      .subscribe(text => {
        this.imageUrl = text;
      });
  }
}
