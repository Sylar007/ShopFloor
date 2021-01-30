import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { NotificationList, Notification } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getNotificationList() {
    return this.http.get<NotificationList[]>(`${environment.apiUrl}/Notification/GetNotificationList`);
  }
  getNotificationById(id) {
    return this.http.get<Notification>(`${environment.apiUrl}/Notification/GetNotificationById/${id}`);
  }
  updateNotification(notification: Notification) {
    return this.http.post(`${environment.apiUrl}/Notification/UpdateNotification`, notification);
  }
  addNotification(notification: Notification) {
    return this.http.post(`${environment.apiUrl}/Notification/AddNotification`, notification);
  }
  // getPartModelSelection() {
  //   return this.http.get<PartModelSelection[]>(`${environment.apiUrl}/part/GetPartModelSelection`);
  // }
}
