import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../layout/login/login.component';
import {RegisterComponent} from '../layout/register/register.component';
import {AboutComponent} from './about/about.component';
import {AppointmentScheduleComponent} from './appointment-schedule/appointment-schedule.component';
import {PaymentComponent} from './appointment-schedule/registration-schedule/payment/payment.component';
import {RegistrationScheduleComponent} from './appointment-schedule/registration-schedule/registration-schedule.component';
import {AskAnswerComponent} from './ask-answer/ask-answer.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {ListDoctorComponent} from './list-doctor/list-doctor.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {TalkComponent} from './talk/talk.component';
import {AuthGuard} from '../shared/guards/auth-guard.guard';
import { VideoCallComponent } from './talk/video-call/video-call.component';
import { AppointDetailComponent } from './appointment-schedule/appoint-detail/appoint-detail.component';
import {ChangePasswordComponent} from './my-account/change-password/change-password.component';

export const UserRoutes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'list-doctor', component: ListDoctorComponent},
  {path: 'appointment-schedule', component: AppointmentScheduleComponent, canActivate: [AuthGuard]},
  {path: 'registration-schedule', component: RegistrationScheduleComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'ask-answer', component: AskAnswerComponent},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'talk', component: TalkComponent, canActivate: [AuthGuard]},
  {path: 'video-call', component: VideoCallComponent, canActivate: [AuthGuard]},
  {path: 'appoint-detail/:id/:date', component: AppointDetailComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]}
  // { path: '**', pathMatch:'full', redirectTo: 'routePath' }
];

// @NgModule({
//   imports: [RouterModule.forRoot(userRoutes)],
//   exports: [RouterModule]
// })
// export class UserRoutingModule {
// }
