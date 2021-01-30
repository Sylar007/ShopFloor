import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService, WorkOrderSelectionService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Notification, ReminderTypeSelection, FrequencyTypeSelection } from '../_models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../theme/shared/components/toast/toast.service';

export class FormInput {
  notificationName: any;
  notificationReminder: any;
  notificationReminderType: any;
  notificationFrequency: any;
  notificationFrequencyType: any;
}

@Component({
  templateUrl: './notificationedit.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationEditComponent implements OnInit {
  formInput: FormInput;
  form: any;
  isSubmit: boolean;
  id: string;
  notification: Notification;
  reminderTypeSelections: ReminderTypeSelection[] = [];
  reminderTypeSelection: ReminderTypeSelection;
  frequencyTypeSelections: FrequencyTypeSelection[] = [];
  frequencyTypeSelection: FrequencyTypeSelection;
  isEditMode = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private workorderselectionService: WorkOrderSelectionService,
    public toastEvent: ToastService
  ) {
    this.reminderTypeSelection = {} as ReminderTypeSelection;
    this.frequencyTypeSelection = {} as FrequencyTypeSelection;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.formInput = {
      notificationName: '',
      notificationReminder: '',
      notificationReminderType: '',
      notificationFrequency: '',
      notificationFrequencyType: '',
    };
    this.notificationService.getNotificationById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.formInput.notificationName = x.notificationName;
        this.formInput.notificationFrequencyType = x.notificationFrequencyTypeId;
        this.formInput.notificationReminderType = x.notificationReminderTypeId;
        this.formInput.notificationFrequency = x.notificationFrequency;
        this.formInput.notificationReminder = x.notificationReminder;

        this.workorderselectionService.getReminderTypeSelection()
          .pipe(first())
          .subscribe(reminderTypeSelections => this.reminderTypeSelections = reminderTypeSelections);

        this.workorderselectionService.getFrequencyTypeSelection()
          .pipe(first())
          .subscribe(frequencyTypeSelections => this.frequencyTypeSelections = frequencyTypeSelections);

      });
  }

  saveStep1(form: any) {
    const localNotification = new Notification();
    localNotification.notificationName = form.value.notificationName;
    if (form.value.notificationReminder === '') {
      localNotification.notificationReminder = 0;
    }
    else {
      localNotification.notificationReminder = parseInt(form.value.notificationReminder, 10);
    }
    if (form.value.notificationFrequency === '') {
      localNotification.notificationFrequency = 0;
    }
    else {
      localNotification.notificationFrequency = parseInt(form.value.notificationFrequency, 10);
    }
    localNotification.notificationFrequencyTypeId = parseInt(form.value.notificationFrequencyType, 10);
    localNotification.notificationReminderTypeId = parseInt(form.value.notificationReminderType, 10);

    localNotification.id = parseInt(this.id, 10);

    this.notificationService.updateNotification(localNotification)
      .pipe(first())
      .subscribe(returnObj => {
        this.toastEvent.toast({uid: 'toastAlert', delay: 2000});
      });
  }
}
