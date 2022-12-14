import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.token,
      // "Content-Type": "multipart/form-data",
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient) { }
  public getListPatient(name = "",page = 0, size = 10): Observable<any> {
    const url = `${environment.patientURL}find-all?page=${page}&size=${size}&name=${name}`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
  public deletePatientByID(id: number): Observable<any> {
    const url = `${environment.patientURL}${id}`;
    return this.httpclient.delete<any>(url, this.httpOptions); // Nhớ import catchError
  }
}
