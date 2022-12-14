import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class NewsService {
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
	public getListNews(name = "",page = 0, size = 10): Observable<any> {
		const url = `${environment.newURL}find-all?page=${page}&size=${size}&name=${name}`;
		return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
	}
}
