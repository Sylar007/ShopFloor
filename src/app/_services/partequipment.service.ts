import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { PartEquipment } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartEquipmentService {
  public partEquipment: Observable<PartEquipment>;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }
    GetEquipmentPartList(equipmentId) {
      return this.http.get<PartEquipment[]>(`${environment.apiUrl}/EquipmentPart/GetEquipmentPartList/${equipmentId}`);
    }
}
