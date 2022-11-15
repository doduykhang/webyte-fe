import {Routes} from '@angular/router';
import {DepartmentComponent} from './department/department.component';
import {HomeComponent} from './home/home.component';
import {ListAppointmentComponent} from './list-appointment/list-appointment.component';
import {ListDoctorComponent} from './list-doctor/list-doctor.component';
import {ListOfAppointmentComponent} from './list-of-appointment/list-of-appointment.component';
import {ListPatientComponent} from './list-patient/list-patient.component';
import {ListMedicineComponent} from './list-medicine/list-medicine.component';
import {ListSickComponent} from './list-sick/list-sick.component';
import {NewsComponent} from './list-news/news.component';
import {MyAccountComponent} from './my-account/my-account.component';

export const AdminRoutes: Routes = [
  {path: 'home', component: ListAppointmentComponent},
  {path: 'list-appointment', component: ListAppointmentComponent},
  {path: 'list-of-appointment', component: ListOfAppointmentComponent},
  {path: 'department', component: DepartmentComponent},
  {path: 'list-doctor', component: ListDoctorComponent},
  {path: 'list-patient', component: ListPatientComponent},
  {path: 'list-medicine', component: ListMedicineComponent},
  {path: 'list-sick', component: ListSickComponent},
  {path: 'list-news', component: NewsComponent},
  {path: 'my-account', component: MyAccountComponent}
];
