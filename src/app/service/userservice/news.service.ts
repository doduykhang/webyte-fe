import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
	constructor(private httpclient: HttpClient, ) { }

	public getListNews(): Observable<any> {
		const url = `${environment.newURL}find-all`;
		return this.httpclient.get<any>(url, this.httpOptions);// Nhớ import catchError
	}

	public createNews(data): Observable<any> {
		const url = `${environment.newURL}`;
		return this.httpclient.post<any>(url, data, this.httpOptions);// Nhớ import catchError
	}

	public updateNews(data): Observable<any> {
		const url = `${environment.newURL}`;
		return this.httpclient.put<any>(url, data, this.httpOptions);// Nhớ import catchError
	}

	public deleteNews(id): Observable<any> {
		const url = `${environment.newURL}${id}`;
		return this.httpclient.delete<any>(url, this.httpOptions);// Nhớ import catchError
	}
}
