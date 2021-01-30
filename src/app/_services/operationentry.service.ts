import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Operation_Entry } from '../_models';
import { Observable } from 'rxjs';

export class ResultSelection {
  part_id: number;
  result: number
}
@Injectable({ providedIn: 'root' })
export class OperationEntryService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }
  updateEntry(operationEntry: Operation_Entry) {
    return this.http.post(`${environment.apiUrl}/OperationEntry/UpdateEntry`, operationEntry);
  }
  addEntry(operationEntry: Operation_Entry) {
    return this.http.post(`${environment.apiUrl}/OperationEntry/AddEntry`, operationEntry);
  }

  entryDetails(resultSelections: ResultSelection[]) {
    return this.http.post(`${environment.apiUrl}/OperationEntry/EntryDetails`, resultSelections);
  }
}
