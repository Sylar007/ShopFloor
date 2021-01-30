import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ReturnFile, UploadWOFile, WorkOrderList, WorkOrderPart } from '../_models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  uploadPart(file: File, id): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${environment.apiUrl}/FileMedia/UploadFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  upload(file: File, woId, fileType): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', woId);
    formData.append('fileType', fileType);

    const req = new HttpRequest('POST', `${environment.apiUrl}/WOFile/UploadFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadTaskSub(file: File, woId, fileType, task_sub_id, upload_type): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', woId);
    formData.append('fileType', fileType);

    const req = new HttpRequest('POST', `${environment.apiUrl}/WOTaskSubFile/UploadFiles/${task_sub_id}/${upload_type}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadEquipmentFile(file: File, equipmentId): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', equipmentId);

    const req = new HttpRequest('POST', `${environment.apiUrl}/EquipmentFile/UploadFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  uploadEquipmentModelFile(file: File, equipmentModelId): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('id', equipmentModelId);

    const req = new HttpRequest('POST', `${environment.apiUrl}/EquipmentModelFile/UploadFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(woId) {
    return this.http.get<ReturnFile[]>(`${environment.apiUrl}/WOFile/GetWOFileList/${woId}`);
  }

  getTaskSubFiles(woid, task_sub_id, upload_type) {
    return this.http.get<ReturnFile[]>(`${environment.apiUrl}/WOTaskSubFile/GetWOTaskSubFileList/${woid}/${task_sub_id}/${upload_type}`);
  }

  getEquipmentFiles(equipmentId) {
    return this.http.get<ReturnFile[]>(`${environment.apiUrl}/EquipmentFile/GetFileList/${equipmentId}`);
  }

  getEquipmentModelFiles(equipmentModelId) {
    return this.http.get<ReturnFile[]>(`${environment.apiUrl}/EquipmentModelFile/GetFileList/${equipmentModelId}`);
  }

  viewFile(id) {
    return this.http.get(`${environment.apiUrl}/FileMedia/DownloadFileFromFileSystem/${id}`);
  }

  viewTaskSubFile(id) {
    return this.http.get(`${environment.apiUrl}/WOTaskSubFile/DownloadFileFromFileSystem/${id}`, { responseType: "blob", observe: 'response' });
  }

  viewEquipmentFile(id) {
    return this.http.get(`${environment.apiUrl}/EquipmentFile/DownloadFileFromFileSystem/${id}`, { responseType: "blob", observe: 'response' });
  }

  viewEquipmentModelFile(id) {
    return this.http.get(`${environment.apiUrl}/EquipmentModelFile/DownloadFileFromFileSystem/${id}`, { responseType: "blob", observe: 'response' });
  }
}
