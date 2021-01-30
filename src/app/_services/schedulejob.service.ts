import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { OperationTechnician, OperationTechnicianList, Parts, Schedule, ScheduleJobList } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  openScheduleJobList() {
    return this.http.get<ScheduleJobList[]>(`${environment.apiUrl}/ScheduleJob/OpenScheduleJobList`);
  }
  openOperationTechnicianList() {
    return this.http.get<OperationTechnicianList[]>(`${environment.apiUrl}/ScheduleJob/OpenOperationTechnicianList`);
  }
  getScheduleJobById(id) {
    return this.http.get<ScheduleJobList>(`${environment.apiUrl}/ScheduleJob/GetScheduleJobById/${id}`);
  }
  getEntryScheduleJobById(id) {
    return this.http.get<Parts>(`${environment.apiUrl}/ScheduleJob/GetEntryScheduleJobById/${id}`);
  }
  getScheduleById(id) {
    return this.http.get<Schedule>(`${environment.apiUrl}/ScheduleJob/GetScheduleById/${id}`);
  }
  getTechnicianById(id) {
    return this.http.get<OperationTechnician>(`${environment.apiUrl}/ScheduleJob/GetTechnicianById/${id}`);
  }
  updateSchedule(schedule: Schedule) {
    return this.http.post(`${environment.apiUrl}/ScheduleJob/UpdateSchedule`, schedule);
  }
  addSchedule(schedule: Schedule) {
    return this.http.post(`${environment.apiUrl}/ScheduleJob/AddSchedule`, schedule);
  }
  updateTechnician(operationTechnician: OperationTechnician) {
    return this.http.post(`${environment.apiUrl}/ScheduleJob/updateTechnician`, operationTechnician);
  }
}
