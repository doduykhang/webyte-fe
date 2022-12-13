import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentScheduleService {
  private httpOptions = {
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
  public getListAppoint(): Observable<any> {
    const url = `${environment.appointmentURL}all`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
  public updateStatusAppSch(id: number, trangthai: string): Observable<any> {
    const url = `${environment.appointmentURL}update-status/${id}/${trangthai}`;
    return this.httpclient.put<any>(url, this.httpOptions);
  }

  public updateStatusDone(id): Observable<any> {
    const url = `${environment.appointmentURL}update-done/${id}`;
    return this.httpclient.put<any>(url, this.httpOptions);
  }

  public updateStatusComplete(id): Observable<any> {
    const url = `${environment.appointmentURL}update-complete/${id}`;
    return this.httpclient.put<any>(url, this.httpOptions);
  }
  public getListChart(id): Observable<any> {
    const url = `${environment.appointmentURL}getAppointDate`+id;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
  public getListAppointByDoctor(id: number): Observable<any> {
    const url = `${environment.appointmentURL}doctor/${id}`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
}
