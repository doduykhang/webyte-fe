import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DeptService {

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
	public getListDept(page: number = 0, size: number = 10): Observable<any> {
		const url = `${environment.deptURL}find-all?page=${page}&size=${size}`;
		return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
	}

	public createDept(data: any) {
		const url = `${environment.deptURL}`;
		return this.httpclient.post<any>(url, data, this.httpOptions);
	}

	public updateDept(data: any) {
		const url = `${environment.deptURL}`;
		return this.httpclient.put<any>(url, data, this.httpOptions);
	}

	public deleteDeptByID(id: number) {
		const url = `${environment.deptURL}${id}`;
		return this.httpclient.delete<any>(url, this.httpOptions);
	}
}
