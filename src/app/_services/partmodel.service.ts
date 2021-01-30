import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { PartModelField, PartModel, PartModelList, PartModelSelection, PartTypeSelection } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartModelService {
  public partmodelField: Observable<PartModelField>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getPartModelFieldList(partModelId) {
    return this.http.get<PartModelField[]>(`${environment.apiUrl}/partmodelField/GetPartModelFieldList/${partModelId}`);
  }

  deletePartModelField(id) {
    return this.http.delete<PartModelField[]>(`${environment.apiUrl}/partmodelField/DeletePartModelField/${id}`);
  }

  updatePartModelField(params) {
    return this.http.put(`${environment.apiUrl}/partmodelField/UpdatePartModelField`, params);
  }

  createPartModelField(partField: PartModelField) {
    return this.http.post(`${environment.apiUrl}/partmodelField/CreatePartModelField`, partField);
  }

  getPartModelList() {
    return this.http.get<PartModelList[]>(`${environment.apiUrl}/partmodel/GetPartModelList`);
  }

  getPartModelById(id) {
    return this.http.get<PartModel>(`${environment.apiUrl}/partmodel/GetPartModelById/${id}`);
  }
  updatePartModel(part: PartModel) {
    return this.http.post(`${environment.apiUrl}/partmodel/UpdatePartModel`, part);
  }
  addPartModel(part: PartModel) {
    return this.http.post(`${environment.apiUrl}/partmodel/AddPartModel`, part);
  }
  getPartTypeSelection() {
    return this.http.get<PartTypeSelection[]>(`${environment.apiUrl}/partmodel/GetPartTypeSelection`);
  }
}
