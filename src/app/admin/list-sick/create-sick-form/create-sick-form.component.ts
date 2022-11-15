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
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<CreateMedicineFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      sickName: "",
      sickTypeId: 1
    })
    console.log(this.data);
    
    this.sicktypes = this.data
  }

  onSubmit(){
    try {

      this.sickService.create(this.myForm.value).subscribe(data => {
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
