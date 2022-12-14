import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { DoctorServiceService } from 'src/app/service/adminservice/doctor-service.service';
import { NotifyService } from 'src/app/service/notify.service';
import { CreateDoctorFormComponent } from '../create-doctor-form/create-doctor-form.component';

@Component({
	selector: 'app-update-doctor-form',
	templateUrl: './update-doctor-form.component.html',
	styleUrls: ['./update-doctor-form.component.css']
})
export class UpdateDoctorFormComponent implements OnInit {

	myForm: FormGroup;
	listDept

	constructor(private doctorService: DoctorServiceService, private deptService: DeptService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<CreateDoctorFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			username: "",
			userFName: "",
			userLName: "",
			email: "",
			phoneNum: "",
			address: "",
			image: "",
			birthDate: new Date(),
			doctorName: "",
			...this.data.doctor
		})
		this.listDept = this.data.listDept
	}

	onSubmit() {
		try {
			const data = {
				...this.data.doctor,
				...this.myForm.value,
			}
			delete data.departmentDTOs
			this.doctorService.updateDoctor(data).subscribe(data => {
				this.notify.notifySuccessNotLink("Sửa thành công", "")
				this.dialogRef.close();
			}, err => {
				this.notify.notifiError("Error", err)
			})

		} catch {

		}

	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
