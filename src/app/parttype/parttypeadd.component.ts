import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  templateUrl: './parttypeadd.component.html',
  styleUrls: ['./parttype.component.css']
})
export class PartTypeAddComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  partType: PartType;
  isEditModeMain = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
  }

  saveStep1(form: any) {
    const localPartType = new PartType();
    localPartType.name = form.value.name;
    localPartType.description = form.value.description;

    if (this.isEditModeMain === false) {
      localPartType.id = 0;
      this.parttypeService.addPartType(localPartType)
        .pipe(first())
        .subscribe(returnObj => {
          this.id = String(returnObj);
          this.isEditModeMain = true;
          this.router.navigate(['../'], { relativeTo: this.route });
          //this.toastEvent.toast({uid: 'toastAlertAdd', delay: 2000});
        });
    } else {
      localPartType.id = parseInt(this.id, 10);
      this.parttypeService.updatePartType(localPartType)
        .pipe(first())
        .subscribe(returnObj => {
          this.toastEvent.toast({uid: 'toastAlert', delay: 2000});
        });

    }
  }
}
