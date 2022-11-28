import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DoctorServiceService {

	listDoctor;
	listDept;
	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			// 'Authorization': 'Bearer ' + this.token,
			// "Content-Type": "multipart/form-data",
			// 'Accept': 'application/json',
			// 'Content-Type': 'application/json',
		}),
	};

	constructor(private httpclient: HttpClient) {
	}

	public getListDoctor(page = 0, size = 10): Observable<any> {
		const url = `${environment.doctorURL}find-all?page=${page}&size=${size}`;
		return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
	}

	public getListDoctorByDept(deptid, date): Observable<any> {
		const url = `${environment.doctorURL}` + deptid + '/' + date;
		return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
	}

	public deleteDoctorByID(id: number): Observable<any> {
		const url = `${environment.doctorURL}${id}`;
		return this.httpclient.delete<any>(url, this.httpOptions); // Nhớ import catchError
	}

	public createDoctor(form: any): Observable<any> {
		const url = `${environment.doctorURL}`;
		console.log(url);
		return this.httpclient.post<any>(url, form, this.httpOptions)
	}

	public updateDoctor(form: any): Observable<any> {
		const url = `${environment.doctorURL}`;
		console.log(url);
		return this.httpclient.put<any>(url, form, this.httpOptions)
	}
}
