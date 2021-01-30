import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { PartType } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartTypeService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getPartTypeList() {
    return this.http.get<PartType[]>(`${environment.apiUrl}/PartType/GetPartTypeList`);
  }

  getPartTypeById(id) {
    return this.http.get<PartType>(`${environment.apiUrl}/PartType/GetPartTypeById/${id}`);
  }
  updatePartType(part: PartType) {
    return this.http.post(`${environment.apiUrl}/PartType/UpdatePartType`, part);
  }
  addPartType(part: PartType) {
    return this.http.post(`${environment.apiUrl}/PartType/AddPartType`, part);
  }
}
