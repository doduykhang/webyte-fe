import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineBill } from 'src/app/doctor/list-as/detail/detail.component';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MedicineServiceService {

  newListMedicine: MedicineBill[]=[];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authentication.currentUserValue.token}`,
      // 'Authorization': 'Bearer ' + this.token,
      // "Content-Type": "multipart/form-data",
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    }),
  };
  constructor(private httpclient: HttpClient, private authentication: AuthenticationService) { }
  public getListMedicine(): Observable<any> {
    const url = `${environment.medicineURL}`;
    return this.httpclient.get<any>(url, this.httpOptions); // Nhớ import catchError
  }
  getMedical(){
    return this.newListMedicine;
  }
  addMedical(itemMedicine){


      if(itemMedicine!=null){
        this.newListMedicine.push(itemMedicine);

        console.log(this.newListMedicine);
      }

  }
}
