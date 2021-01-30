import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EquipmentType } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentTypeService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getEquipmentTypeList() {
    return this.http.get<EquipmentType[]>(`${environment.apiUrl}/EquipmentType/GetEquipmentTypeList`);
  }

  getEquipmentTypeById(id) {
    return this.http.get<EquipmentType>(`${environment.apiUrl}/EquipmentType/GetEquipmentTypeById/${id}`);
  }
  updateEquipmentType(part: EquipmentType) {
    return this.http.post(`${environment.apiUrl}/EquipmentType/UpdateEquipmentType`, part);
  }
  addEquipmentType(part: EquipmentType) {
    return this.http.post(`${environment.apiUrl}/EquipmentType/AddEquipmentType`, part);
  }
}
