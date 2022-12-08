import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { DoctorServiceService } from 'src/app/service/adminservice/doctor-service.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
	selector: 'app-create-department-form',
	templateUrl: './create-department-form.component.html',
	styleUrls: ['./create-department-form.component.css']
})
export class CreateDepartmentFormComponent implements OnInit {

	myForm: FormGroup;

	constructor(private deptService: DeptService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<CreateDepartmentFormComponent>,

	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			departmentName: ""
		})
	}

	onSubmit() {
		try {
			this.deptService.createDept(this.myForm.value).subscribe(data => {
				this.notify.notifySuccessNotLink("Created", "Created")
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
