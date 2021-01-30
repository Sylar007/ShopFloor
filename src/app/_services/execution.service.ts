import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Execution, WOExecution } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExecutionService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  getExecutionById(id) {
    return this.http.get<Execution>(`${environment.apiUrl}/WOExecution/GetExecutionById/${id}`);
  }
  updateWoExecution(woExecution: WOExecution) {
    return this.http.post(`${environment.apiUrl}/WOExecution/UpdateWorkExecution`, woExecution);
  }

}
