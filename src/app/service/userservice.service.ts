import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {CATCH_ERROR_VAR} from '@angular/compiler/src/output/output_ast';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Patient} from '../models/patient';
import {UserAccount} from '../models/user-account';
import {environment} from '../../environments/environment';
import {NotifyService} from './notify.service';
import {error} from 'protractor';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {



  constructor(private http: HttpClient, private notify: NotifyService, private authentication: AuthenticationService) {
    this.currentPatientSubject = new BehaviorSubject<Patient>(JSON.parse(localStorage.getItem('currentPatient')));
    this.currentPatient = this.currentPatientSubject.asObservable();
  }

  public get currentPatientValue(): Patient {
    return this.currentPatientSubject.value;
  }

  token = localStorage.getItem('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' +this.authentication.currentUserValue.token
      // ,
      // 'Authorization': 'Bearer ' + this.token,
      // "Content-Type": "multipart/form-data",
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    }),
  };
  // PATIENT
  private currentPatientSubject: BehaviorSubject<Patient>;
  public currentPatient: Observable<Patient>;

  register(obj: any[]) {
    return this.http.post(`${environment.baseURL}signupUser`, obj);
  }

  getPatientById(id: number) {
    return this.http.get<Patient>(`${environment.patientURL}${id}`).pipe(map(data => {
      if (data != null) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentPatient', JSON.stringify(data));
        // @ts-ignore
        this.currentPatientSubject.next(data);
        console.log('data = ' + data);
        return data;
      }
      console.log('data = ' + null);
      return null;
    }));
  }

  getListPatient() {
    return this.http.get<Patient[]>(`${environment.patientURL}get-all-patient`);
  }

  updatePatient(obj: Patient) {
    console.log('obj Update = ' + obj);
    return this.http.put(`${environment.patientURL}update`, obj).pipe(map(data => {
      if (data != null) {
        localStorage.setItem('currentPatient', JSON.stringify(data));
        return data;
      }
      return null;
    }));
  }

  // tslint:disable-next-line:no-shadowed-variable
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  forgotPassword(email: string) {
    return this.http.get(`${environment.forgotPassURL}${email}`).pipe(map(data => {
      if (data) {
        return data;
      }
      return null;
    }));
  }

  checkPassword(id: number, password: string): Observable<any> {
    return this.http.post(`${environment.baseURL}` + 'check-password/' + id, password, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authentication.currentUserValue.token,
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  changePassword(id: number, password: string): Observable<any> {
    return this.http.put(`${environment.baseURL}` + 'change-password/' + id, password, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authentication.currentUserValue.token,
      })
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Credential', 'true'),
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentPatient');
    this.currentPatientSubject.next(null);
  }
}
