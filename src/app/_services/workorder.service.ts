import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { WorkOrderList, WorkOrderPart, WorkOrder, EventModel } from '../_models';
import { Observable } from 'rxjs';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getWorkOrder(workorderNo) {
    return this.http.get<WorkOrder>(`${environment.apiUrl}/workorder/GetByWorkOrderNo/${workorderNo}`);
  }

  getWorkOrderPart(workorderNo) {
    return this.http.get<WorkOrderPart[]>(`${environment.apiUrl}/workorder/GetPartByWorkOrderNo/${workorderNo}`);
  }

  getPartByWorkId(id: number) {
    return this.http.get<WorkOrderPart[]>(`${environment.apiUrl}/workorder/GetPartByWorkId/${id}`);
  }

  openWorkOrderList() {
    return this.http.get<WorkOrderList[]>(`${environment.apiUrl}/workorder/GetWorkOrderList`);
  }

  addWorkOrder(workorder: WorkOrder) {
    return this.http.post(`${environment.apiUrl}/workorder/AddWorkOrder`, workorder);
  }

  updateWorkOrder(workorder: WorkOrder) {
    return this.http.post(`${environment.apiUrl}/workorder/UpdateWorkOrder`, workorder);
  }

  updateTaskSubTree(woid: number, events: EventModel[]) {
    return this.http.post(`${environment.apiUrl}/workorder/UpdateTaskSubTree/${woid}`, events);
  }

  updateTaskExecutionSubTree(woid: number, events: EventModel[]) {
    return this.http.post(`${environment.apiUrl}/workorder/updateTaskExecutionSubTree/${woid}`, events);
  }
}
