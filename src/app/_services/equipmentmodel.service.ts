import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { EquipmentModel, EquipmentModelField, EquipmentModelList, EquipmentModelPart } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentModelService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getEquipmentModelPartList(id) {
    return this.http.get<EquipmentModelPart[]>(`${environment.apiUrl}/EquipmentModelPart/GetEquipmentModelPartList/${id}`);
  }

  getEquipmentModelFieldList(equipmentModelId) {
    return this.http.get<EquipmentModelField[]>(`${environment.apiUrl}/EquipmentModelField/GetEquipmentModelFieldList/${equipmentModelId}`);
  }

  deleteEquipmentModelField(id) {
    return this.http.delete<EquipmentModelField[]>(`${environment.apiUrl}/EquipmentModelField/DeleteEquipmentModelField/${id}`);
  }

  updateEquipmentModelField(params) {
    return this.http.put(`${environment.apiUrl}/EquipmentModelField/UpdateEquipmentModelField`, params);
  }

  createEquipmentModelField(equipmentModelField: EquipmentModelField) {
    return this.http.post(`${environment.apiUrl}/EquipmentModelField/CreateEquipmentModelField`, equipmentModelField);
  }

  getEquipmentModelList() {
    return this.http.get<EquipmentModelList[]>(`${environment.apiUrl}/EquipmentModel/GetEquipmentModelList`);
  }

  getEquipmentModelById(id) {
    return this.http.get<EquipmentModel>(`${environment.apiUrl}/EquipmentModel/GetEquipmentModelById/${id}`);
  }
  updateEquipmentModel(equipmentModel: EquipmentModel) {
    return this.http.post(`${environment.apiUrl}/EquipmentModel/UpdateEquipmentModel`, equipmentModel);
  }
  // updatePartModel(part: PartModel) {
  //   return this.http.post(`${environment.apiUrl}/partmodel/UpdatePartModel`, part);
  // }
  addEquipmentModel(equipmentModel: EquipmentModel) {
    return this.http.post(`${environment.apiUrl}/EquipmentModel/AddEquipmentModel`, equipmentModel);
  }
  // getPartTypeSelection() {
  //   return this.http.get<PartTypeSelection[]>(`${environment.apiUrl}/partmodel/GetPartTypeSelection`);
  // }
}
