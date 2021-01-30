import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentTypeService } from '../_services';
import { first } from 'rxjs/operators';
import { EquipmentType } from '../_models';
import {ToastService} from '../theme/shared/components/toast/toast.service';
import * as _ from 'lodash';

export class FormInput {
  name: any;
  description: any;
}

@Component({
  templateUrl: './equipmenttypeadd.component.html',
  styleUrls: ['./equipmenttype.component.css']
})
export class EquipmentTypeAddComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  partType: EquipmentType;
  isEditModeMain = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipmenttypeService: EquipmentTypeService,
    public toastEvent: ToastService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      name: '',
      description: ''
    };
    this.equipmenttypeService.getEquipmentTypeById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.name = x.name;
        this.formInput.description = x.description;
      });
  }

  saveStep1(form: any) {
    const localEquipmentType = new EquipmentType();
    localEquipmentType.name = form.value.name;
    localEquipmentType.description = form.value.description;

    if (this.isEditModeMain === false) {
      localEquipmentType.id = 0;
      this.equipmenttypeService.addEquipmentType(localEquipmentType)
        .pipe(first())
        .subscribe(returnObj => {
          this.id = String(returnObj);
          this.isEditModeMain = true;
          this.router.navigate(['../'], { relativeTo: this.route });
          //this.toastEvent.toast({uid: 'toastAlertAdd', delay: 2000});
        });
    } else {
      localEquipmentType.id = parseInt(this.id, 10);
      this.equipmenttypeService.updateEquipmentType(localEquipmentType)
        .pipe(first())
        .subscribe(returnObj => {
          this.toastEvent.toast({uid: 'toastAlert', delay: 2000});
        });

    }
  }
}
