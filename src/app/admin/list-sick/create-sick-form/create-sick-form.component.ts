import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SickService } from 'src/app/service/adminservice/sick.service';
import { NotifyService } from 'src/app/service/notify.service';
import { CreateMedicineFormComponent } from '../../list-medicine/create-medicine-form/create-medicine-form.component';

@Component({
	selector: 'app-create-sick-form',
	templateUrl: './create-sick-form.component.html',
	styleUrls: ['./create-sick-form.component.css']
})
export class CreateSickFormComponent implements OnInit {
	myForm: FormGroup;
	sicktypes

	constructor(private sickService: SickService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<CreateMedicineFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			sickName: "",
			typeSickId: 1,
			description: "",
			symptonIds: []
		})

		this.sicktypes = this.data
	}

	onSubmit() {
		this.myForm.value.symptomIds = []
		this.sickService.create(this.myForm.value).subscribe(() => {
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
