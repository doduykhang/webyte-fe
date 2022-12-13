import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.authentication.currentUserValue.token}`,
    // 'Authorization': 'Bearer ' + this.token,
    // "Content-Type": "multipart/form-data",
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  }),
};
  constructor(private httpclient: HttpClient, private authentication: AuthenticationService) { }
  public getListPrescription(id): Observable<any> {
    const url = `${environment.healthRecordURL}${id}`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }

  public createPrescriptions(data): Observable<any> {
    const url = `${environment.healthRecordURL}`;
    return this.httpclient.post<any>(url, data, this.httpOptions); // Nhớ import catchError
  }
}
