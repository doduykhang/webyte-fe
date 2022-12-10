import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
  selector: 'app-update-department-form',
  templateUrl: './update-department-form.component.html',
  styleUrls: ['./update-department-form.component.css']
})
export class UpdateDepartmentFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private deptService: DeptService,
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<UpdateDepartmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.myForm = this.fb.group({
      ...this.data
    })
  }

  onSubmit(){
    try {

      this.deptService.updateDept(this.myForm.value).subscribe(data => {
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
