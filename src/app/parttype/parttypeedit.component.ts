import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartTypeService } from '../_services';
import { first } from 'rxjs/operators';
import { PartType } from '../_models';
import * as _ from 'lodash';
import {ToastService} from '../theme/shared/components/toast/toast.service';

export class FormInput {
  name: any;
  description: any;
}

@Component({
  templateUrl: './parttypeedit.component.html',
  styleUrls: ['./parttype.component.css']
})
export class PartTypeEditComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  partType: PartType;
  constructor(
    private route: ActivatedRoute,
    private parttypeService: PartTypeService,
    public toastEvent: ToastService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      name: '',
      description: ''
    };
    this.parttypeService.getPartTypeById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.name = x.name;
        this.formInput.description = x.description;
      });
  }

  saveStep1(form: any) {
    const localPartType = new PartType();
    localPartType.name = form.value.name;
    localPartType.description = form.value.description;
    localPartType.id = parseInt(this.id, 10);
    this.parttypeService.updatePartType(localPartType)
      .pipe(first())
      .subscribe(returnObj => {
        this.toastEvent.toast({uid: 'toastAlert', delay: 2000});
      });
  }
}
