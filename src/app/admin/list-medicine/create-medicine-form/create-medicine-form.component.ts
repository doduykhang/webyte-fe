import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MedicineService } from 'src/app/service/adminservice/medicine.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
	selector: 'app-create-medicine-form',
	templateUrl: './create-medicine-form.component.html',
	styleUrls: ['./create-medicine-form.component.css']
})
export class CreateMedicineFormComponent implements OnInit {
	myForm: FormGroup;

	constructor(private medicineService: MedicineService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<CreateMedicineFormComponent>,
	) {
	}

	types = [{ value: "Thuốc hạ sốt, kháng viêm" },
	{ value: "Thuốc giảm đau" },
	{ value: "Thuốc tiêu hóa" },
	{ value: "Thuốc da liễu" },
	{ value: "Thuốc sát trùng" },
	{ value: "Nước muối sinh lý" },
	{ value: "Các thuốc trị bệnh mãn tính" },
	{ value: "Các thuốc đặc trị" },
	{ value: "Các thuốc khác" }
	];

	packs = [{ value: "Vỉ" },
	{ value: "Ống" },
	{ value: "Hộp" },
	{ value: "Khác" }
	];

	ngOnInit() {
		this.myForm = this.fb.group({
			medicineName: "",
			medicineStatus: "",
			medicineQuantity: 0,
			medicinePack: "",
			medicinePrice: 0,
			medicineType: "",
			medicineDescription: ""
		})
	}

	onSubmit() {
		try {

			this.medicineService.create(this.myForm.value).subscribe(data => {
				this.notify.notifySuccessNotLink("Thêm thành công", "")
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
