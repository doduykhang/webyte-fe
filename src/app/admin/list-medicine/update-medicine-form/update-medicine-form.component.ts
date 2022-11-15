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

  onSubmit(){
    try {

      this.medicineService.update(this.myForm.value).subscribe(data => {
        this.notify.notifySuccessNotLink("Created", "Created")
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
