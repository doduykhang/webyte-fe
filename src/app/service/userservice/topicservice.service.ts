import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { question } from 'src/app/models/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicserviceService {
  token = localStorage.getItem('curentUser');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    })
  };
  constructor(private httpclient: HttpClient) { }
  public getAllTopics(): Observable<any> {
    const url = `${environment.topicURL}get-all-topic`;
    return this.httpclient.get<any>(url);// Nhớ import catchError
  }

}
