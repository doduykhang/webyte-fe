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
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<CreateMedicineFormComponent>,
              ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      medicinename: "",
      status: "",
      count: 0,
      pack: ""
    })
  }

  onSubmit(){
    try {

      this.medicineService.create(this.myForm.value).subscribe(data => {
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
