import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { DoctorServiceService } from 'src/app/service/adminservice/doctor-service.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
	selector: 'app-create-doctor-form',
	templateUrl: './create-doctor-form.component.html',
	styleUrls: ['./create-doctor-form.component.css']
})
export class CreateDoctorFormComponent implements OnInit {

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
			doctorName: ""
		})
		this.listDept = this.data.listDept
	}

	onSubmit() {
		this.doctorService.createDoctor(this.myForm.value).subscribe(() => {
			this.notify.notifySuccessNotLink("Thêm thành công", "")
			this.dialogRef.close();
			return;
		})
		this.notify.notifiError('Lỗi', 'Có lỗi trong quá trình thực thi, thử lại sau')
	}

	onNoClick(): void {

		this.dialogRef.close();
	}
}
