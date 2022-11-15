import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { question } from 'src/app/models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  constructor(private httpclient: HttpClient) { }
  public getAllQuestion(): Observable<any> {
    const url = `${environment.questionURL}get-all-question-answers`;
    return this.httpclient.get<any>(url);// Nhớ import catchError
  }
  public insertAllTopics(data:question): Observable<any> {
    const url = `${environment.questionURL}`;
    return this.httpclient.post<any>(url,data);// Nhớ import catchError
  }
}
