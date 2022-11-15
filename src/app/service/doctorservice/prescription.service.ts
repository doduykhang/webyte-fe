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
  public getListPrescription(): Observable<any> {
    const url = `${environment.prescriptionURL}get-all-prescription`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
}
