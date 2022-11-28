import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MedicineService {
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
	public getListMedicine(): Observable<any> {
		const url = `${environment.medicineURL}find-all`;
		return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
	}

	public create(data: any) {
		const url = `${environment.medicineURL}`;
		return this.httpclient.post<any>(url, data, this.httpOptions);
	}

	public update(data: any) {
		const url = `${environment.medicineURL}`;
		return this.httpclient.put<any>(url, data, this.httpOptions);
	}

	public deleteByID(id: number) {
		const url = `${environment.medicineURL}${id}`;
		return this.httpclient.delete<any>(url, this.httpOptions);
	}
}
