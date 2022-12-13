import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SickService } from 'src/app/service/adminservice/sick.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
	selector: 'app-update-sick-form',
	templateUrl: './update-sick-form.component.html',
	styleUrls: ['./update-sick-form.component.css']
})
export class UpdateSickFormComponent implements OnInit {
	myForm: FormGroup;
	sicktypes

	constructor(private sickService: SickService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<UpdateSickFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			...this.data.sick
		})

		this.sicktypes = this.data.sicktypes
	}

	onSubmit() {
		const data = {
			...this.myForm.value,
			symptomIds: []
		}
		this.sickService.update(data).subscribe(() => {
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
