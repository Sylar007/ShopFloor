import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Part, PartField, PartList, PartModelSelection, PartSet } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartService {
  public partField: Observable<PartField>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getPartList() {
    return this.http.get<PartList[]>(`${environment.apiUrl}/part/GetPartList`);
  }
  getPartById(id) {
    return this.http.get<Part>(`${environment.apiUrl}/part/getPartById/${id}`);
  }
  updatePart(part: Part) {
    return this.http.post(`${environment.apiUrl}/part/UpdatePart`, part);
  }
  addPart(part: Part) {
    return this.http.post(`${environment.apiUrl}/part/AddPart`, part);
  }
  getPartModelSelection() {
    return this.http.get<PartModelSelection[]>(`${environment.apiUrl}/part/GetPartModelSelection`);
  }
  getPartSetSelection() {
    return this.http.get<PartSet[]>(`${environment.apiUrl}/part/GetPartSetSelection`);
  }
}
