import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Equipment, EquipmentScanner, ScannerPart, ScannerType, WorkOrder, WorkOrderScanner } from '../_models';

@Injectable({ providedIn: 'root' })
export class ScannerService {
  public equipment: Observable<EquipmentScanner>;
  public part: Observable<ScannerPart>;
  public scannerType: Observable<ScannerType>;
  public workorder: Observable<WorkOrderScanner>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getQRtype(serialNo) {
    return this.http.post<ScannerType>(`${environment.apiUrl}/qrlink/GetTypeBySerialNo/${serialNo}`, {})
      .pipe(map(scannerType => {
        return scannerType;
      }));
  }
  openEquipment(serialNo) {
    return this.http.post<EquipmentScanner>(`${environment.apiUrl}/equipment/GetEquipmentBySerialNo/${serialNo}`, {})
      .pipe(map(equipment => {
        return equipment;
      }));
  }

  openPart(serialNo) {
    return this.http.post<ScannerPart>(`${environment.apiUrl}/part/GetPartBySerialNo/${serialNo}`, {})
      .pipe(map(part => {
        return part;
      }));
  }

  openWorkOrder(workorderNo) {
    return this.http.post<WorkOrderScanner>(`${environment.apiUrl}/workorder/GetWorkOrderByWorkOrderNo/${workorderNo}`, {})
      .pipe(map(workorder => {
        return workorder;
      }));
  }

  editWorkOrder(workorderNo) {
    return this.http.post<WorkOrder>(`${environment.apiUrl}/workorder/GetEditWorkOrderByWorkOrderNo/${workorderNo}`, {})
      .pipe(map(workorder => {
        return workorder;
      }));
  }

  editEquipment(equipmentNo) {
    return this.http.post<Equipment>(`${environment.apiUrl}/equipment/GetEditEquipmentByEquipmentNo/${equipmentNo}`, {})
      .pipe(map(equipment => {
        return equipment;
      }));
  }
}
