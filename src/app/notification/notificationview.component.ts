import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../_services';
import { FormBuilder, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Notification } from '../_models';
import * as _ from 'lodash';

@Component({
  templateUrl: './notificationview.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationViewComponent implements OnInit {
  id: string;
  notification: Notification;
  dtRouterLinkOptions: any = {};
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { this.notification = {} as Notification; }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.notificationService.getNotificationById(this.id)
      .pipe(first())
      .subscribe(x => {
        this.notification = x;
      });
  }
}
