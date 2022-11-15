import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DoctorRoutes} from './doctor.routing.componet';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from './home/home.component';
import {AppointmentScheduleComponent} from './appointment-schedule/appointment-schedule.component';
import {ListASComponent} from './list-as/list-as.component';
import {DetailComponent} from './list-as/detail/detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule, MatGridListModule, MatNativeDateModule, MatSelectModule, MatCardModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {RegisterScheduleComponent} from './register-schedule/register-schedule.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AskAnswerComponent} from './ask-answer/ask-answer.component';
import {CKEditorModule} from 'ckeditor4-angular';
import {MatIconModule} from '@angular/material/icon';
import {ChatComponent} from './chat/chat.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './my-account/change-password/change-password.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
@NgModule({
  declarations: [
    HomeComponent,
    AppointmentScheduleComponent,
    ListASComponent,
    DetailComponent,
    RegisterScheduleComponent,
    AskAnswerComponent,
    ChatComponent,
    MyAccountComponent,
    ChangePasswordComponent,
    ChartComponent,
  ],
  imports: [

    CommonModule,
    RouterModule.forChild(DoctorRoutes),
    NgbModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    CKEditorModule,
    MatExpansionModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    NgxPaginationModule,
    MatCardModule,
    ChartsModule,
  ],
  providers:[ThemeService]
})

export class DoctorModule {
}

