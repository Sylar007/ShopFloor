import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Dashboard } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getDashboardList(id) {
    return this.http.get<Dashboard[]>(`${environment.apiUrl}/Dashboard/GetDashboardList/${id}`);
  }
}
