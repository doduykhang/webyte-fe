import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicineService } from 'src/app/service/adminservice/medicine.service';
import { NotifyService } from 'src/app/service/notify.service';
import { CreateMedicineFormComponent } from '../create-medicine-form/create-medicine-form.component';

@Component({
  selector: 'app-update-medicine-form',
  templateUrl: './update-medicine-form.component.html',
  styleUrls: ['./update-medicine-form.component.css']
})
export class UpdateMedicineFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private medicineService: MedicineService,
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<CreateMedicineFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      ...this.data
    })
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

  onSubmit(){
    try {

      this.medicineService.update(this.myForm.value).subscribe(data => {
        this.notify.notifySuccessNotLink("Sửa thành công", "")
        this.dialogRef.close();
      }, err =>{
        this.notify.notifiError("Error", err)
      })

    } catch {

    }

  }

  onNoClick(): void {

    this.dialogRef.close();
  }
}
