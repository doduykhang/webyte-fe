import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerserviceService {

  constructor(private httpclient: HttpClient) { }
  public getAllQuestion(): Observable<any> {
    const url = `${environment.answerURL}`;
    return this.httpclient.get<any>(url);// Nhớ import catchError
  }
  public insertAllAnswer(data:Answer): Observable<any> {
    const url = `${environment.answerURL}`;
    return this.httpclient.post<any>(url,data);// Nhớ import catchError
  }
}
