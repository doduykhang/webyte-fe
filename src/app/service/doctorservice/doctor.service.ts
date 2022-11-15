import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Doctor} from '../../models/doctor';
import {NotifyService} from '../notify.service';
import {AuthenticationService} from '../authentication.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Patient} from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private currentDoctorSubject: BehaviorSubject<Doctor>;
  public currentDoctor: Observable<Doctor>;
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

  constructor(private httpclient: HttpClient, private notify: NotifyService, private authentication: AuthenticationService) {
    this.currentDoctorSubject = new BehaviorSubject<Doctor>(JSON.parse(localStorage.getItem('currentDoctor')));
    this.currentDoctor = this.currentDoctorSubject.asObservable();
  }

  getDoctorById(id: number) {
    return this.httpclient.get<Doctor>(`${environment.doctorURL}${id}`, this.httpOptions).pipe(
      map(doctor => {
        if (doctor) {
          localStorage.setItem('currentDoctor', JSON.stringify(doctor));
          this.currentDoctorSubject.next(doctor);
          console.log('doctor = ' + doctor);
          return doctor;
        }
        return null;
      })
    );
  }

  updateDoctor(obj: Doctor) {
    return this.httpclient.put(`${environment.doctorURL}update`, obj, this.httpOptions).pipe(map(data => {
      if (data != null) {
        localStorage.setItem('currentDoctor', JSON.stringify(data));
        return data;
      }
      return null;
    }));
  }


  public get currentDoctorValue(): Doctor {
    console.log('current Doctor= ' + this.currentDoctorSubject.value);
    return this.currentDoctorSubject.value;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentDoctor');
    this.currentDoctorSubject.next(null);
  }
}
