import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminRoutes } from './admin.routing';
import { HomeComponent } from './home/home.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ListAppointmentComponent } from './list-appointment/list-appointment.component';
import { MatTableModule } from '@angular/material/table';
import { ListOfAppointmentComponent } from './list-of-appointment/list-of-appointment.component';
import { DepartmentComponent } from './department/department.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatNativeDateModule, MatSelectModule, MatInputModule, MatDialogModule, MatDialogRef, MatButton, MatButtonModule } from '@angular/material';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { ListMedicineComponent } from './list-medicine/list-medicine.component';
import { ListSickComponent } from './list-sick/list-sick.component';
import { NewsComponent } from './list-news/news.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MyAccountComponent } from './my-account/my-account.component';
import { CreateDoctorFormComponent } from './list-doctor/create-doctor-form/create-doctor-form.component';
import { UpdateDoctorFormComponent } from './list-doctor/update-doctor-form/update-doctor-form.component';
import { CreateDepartmentFormComponent } from './department/create-department-form/create-department-form.component';
import { UpdateDepartmentFormComponent } from './department/update-department-form/update-department-form.component';
import { CreateMedicineFormComponent } from './list-medicine/create-medicine-form/create-medicine-form.component';
import { UpdateMedicineFormComponent } from './list-medicine/update-medicine-form/update-medicine-form.component';
import { CreateSickFormComponent } from './list-sick/create-sick-form/create-sick-form.component';
import { UpdateSickFormComponent } from './list-sick/update-sick-form/update-sick-form.component';
import { CreateNewsFormComponent } from './list-news/create-news-form/create-news-form.component';
import { UpdateNewsFormComponent } from './list-news/update-news-form/update-news-form.component';

@NgModule({
	declarations: [
		HomeComponent,
		ListAppointmentComponent,
		ListOfAppointmentComponent,
		DepartmentComponent,
		ListDoctorComponent,
		ListPatientComponent,
		ListMedicineComponent,
		ListSickComponent,
		NewsComponent,
		MyAccountComponent,
		CreateDoctorFormComponent,
		UpdateDoctorFormComponent,
		CreateDepartmentFormComponent,
		UpdateDepartmentFormComponent,
		CreateMedicineFormComponent,
		UpdateMedicineFormComponent,
		CreateSickFormComponent,
		UpdateSickFormComponent,
		CreateNewsFormComponent,
		UpdateNewsFormComponent],
	imports: [

		CommonModule,
		RouterModule.forChild(AdminRoutes),
		NgbModule,
		FormsModule,
		MatTooltipModule,
		MatTableModule,
		MatMenuModule,
		MatIconModule,
		MatSelectModule,
		MatFormFieldModule,
		MatNativeDateModule,
		ReactiveFormsModule,
		MatInputModule,
		NgxPaginationModule,
		MatDialogModule,
		MatButtonModule
	],
	providers: [
		{
			provide: MatDialogRef,
			useValue: {}
		},
	],
	entryComponents: [CreateDoctorFormComponent, UpdateDoctorFormComponent, CreateDepartmentFormComponent,
		UpdateDepartmentFormComponent, CreateMedicineFormComponent, UpdateMedicineFormComponent,
		CreateSickFormComponent, UpdateSickFormComponent, CreateNewsFormComponent, UpdateNewsFormComponent
	]
})

export class AdminModule {
}

