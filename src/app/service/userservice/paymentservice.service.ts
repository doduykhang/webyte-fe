import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    })
  };
  constructor(private httpclient: HttpClient,) { }
  public getPayr(data): Observable<any> {
    const url = `${environment.paymentURL}`;
    return this.httpclient.post<any>(url,data,this.httpOptions);// Nhớ import catchError
  }
  public confirmPay(paymentId,payerid,data): Observable<any> {
    const url = `${environment.paymentURL}/success`+'?paymentId='+paymentId+'&PayerID='+payerid;
    return this.httpclient.post<any>(url,data,this.httpOptions);// Nhớ import catchError
  }


}

