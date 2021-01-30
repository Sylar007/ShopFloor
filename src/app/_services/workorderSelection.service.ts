import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { WorkOrderSelection, CustomerSelection, WorkOrderTypeSelection, AssignSelection, PrioritySelection, ModelSelection, StatusSelection, WoStatusSelection, EquipmentType, FrequencyTypeSelection, ReminderTypeSelection, NotificationSelection, StationSelection, ShiftSelection, ScheduleSelection, FlowSelection } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WorkOrderSelectionService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getCustomerSelection() {
    return this.http.get<CustomerSelection[]>(`${environment.apiUrl}/customer/GetCustomerList`);
  }

  getWorkOrderTypeSelection() {
    return this.http.get<WorkOrderTypeSelection[]>(`${environment.apiUrl}/workorder/GetWorkOrderSelection`);
  }

  getAssignSelection() {
    return this.http.get<AssignSelection[]>(`${environment.apiUrl}/users/GetAssignSelection`);
  }

  getPrioritySelection() {
    return this.http.get<PrioritySelection[]>(`${environment.apiUrl}/wopriority/GetPrioritySelection`);
  }

  getModelSelection() {
    return this.http.get<ModelSelection[]>(`${environment.apiUrl}/equipmentmodel/GetModelSelection`);
  }

  getModelSelectionById(id) {
    return this.http.get<ModelSelection>(`${environment.apiUrl}/equipmentmodel/GetModelSelectionById/${id}`);
  }

  getStatusSelection() {
    return this.http.get<StatusSelection[]>(`${environment.apiUrl}/equipmentstatus/GetEquipmentStatusList`);
  }

  getStatusSelectionById(id) {
    return this.http.get<StatusSelection>(`${environment.apiUrl}/equipmentstatus/GetEquipmentStatusById/${id}`);
  }

  getTaskSelection(woid:number, equipmentid:number, wotypeid:number) {
    return this.http.post<object>(`${environment.apiUrl}/tasksub/GetTaskSubTree`, { woid, equipmentid, wotypeid })
    .pipe(map(obj => {
        return obj;
    }));
  }

  getWOTaskSelection(woid:number, equipmentid:number, wotypeid:number) {
    return this.http.post<object>(`${environment.apiUrl}/tasksub/GetTaskExecutionSubTree`, { woid, equipmentid, wotypeid })
    .pipe(map(obj => {
        return obj;
    }));
  }

  getWoStatusSelection() {
    return this.http.get<WoStatusSelection[]>(`${environment.apiUrl}/WOStatus/GetWOStatusList`);
  }

  getEquipmentTypeSelection() {
    return this.http.get<EquipmentType[]>(`${environment.apiUrl}/EquipmentType/GetEquipmentTypeList`);
  }

  getReminderTypeSelection() {
    return this.http.get<ReminderTypeSelection[]>(`${environment.apiUrl}/Notification/GetReminderTypeSelection`);
  }

  getFrequencyTypeSelection() {
    return this.http.get<FrequencyTypeSelection[]>(`${environment.apiUrl}/Notification/GetFrequencyTypeSelection`);
  }

  getNotificationSelection() {
    return this.http.get<NotificationSelection[]>(`${environment.apiUrl}/Notification/GetNotificationSelection`);
  }

  getStationSelection() {
    return this.http.get<StationSelection[]>(`${environment.apiUrl}/Reference/GetStationList`);
  }
  getShiftSelection() {
    return this.http.get<ShiftSelection[]>(`${environment.apiUrl}/Reference/GetShiftList`);
  }
  getScheduleSelection() {
    return this.http.get<ScheduleSelection[]>(`${environment.apiUrl}/Reference/GetScheduleList`);
  }
  getFlowSelection() {
    return this.http.get<FlowSelection[]>(`${environment.apiUrl}/Reference/GetFlowList`);
  }
}
