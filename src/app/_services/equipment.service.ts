import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Equipment, EquipmentField, EquipmentList, EquipmentScanner, WorkOrderLog } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentService {
  public equipmentField: Observable<EquipmentField>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getEquipmentField(equipmentId) {
    return this.http.get<EquipmentField[]>(`${environment.apiUrl}/equipmentField/GetEquipmentFieldList/${equipmentId}`);
  }

  deleteEquipmentField(id) {
    return this.http.delete<EquipmentField[]>(`${environment.apiUrl}/equipmentField/DeleteEquipmentField/${id}`);
  }

  updateEquipmentField(params) {
    return this.http.put(`${environment.apiUrl}/equipmentField/UpdateEquipmentField`, params);
  }

  createEquipmentField(equipmentField: EquipmentField) {
    return this.http.post(`${environment.apiUrl}/equipmentField/CreateEquipmentField`, equipmentField);
  }

  openEquipmentList() {
    return this.http.get<EquipmentList[]>(`${environment.apiUrl}/equipment/GetEquipmentList`);
  }

  openEquipment(equipment_no) {
    return this.http.get<EquipmentScanner>(`${environment.apiUrl}/equipment/openEquipment/${equipment_no}`);
  }

  addEquipment(equipment: Equipment) {
    return this.http.post(`${environment.apiUrl}/equipment/AddEquipment`, equipment);
  }

  updateEquipment(equipment: Equipment) {
    return this.http.post(`${environment.apiUrl}/equipment/UpdateEquipment`, equipment);
  }

  getEquipmentLog(equipmentId) {
    return this.http.get<WorkOrderLog[]>(`${environment.apiUrl}/equipment/GetEquipmentLog/${equipmentId}`);
  }
}
