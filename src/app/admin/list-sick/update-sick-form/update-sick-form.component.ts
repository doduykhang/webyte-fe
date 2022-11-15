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
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<UpdateSickFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      sickId: this.data.sick.sickid,
      sickName: this.data.sick.sickname,
      sickTypeId: this.data.sick.sicktypeid
    })

    this.sicktypes = this.data.sicktypes
  }

  onSubmit(){
    try {
      const data = {
        ...this.myForm.value
      }
      this.sickService.update(data).subscribe(data => {
        this.notify.notifySuccessNotLink("Update", "Update")
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
