import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { DoctorServiceService } from 'src/app/service/adminservice/doctor-service.service';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
  selector: 'app-create-doctor-form',
  templateUrl: './create-doctor-form.component.html',
  styleUrls: ['./create-doctor-form.component.css']
})
export class CreateDoctorFormComponent implements OnInit {

  myForm: FormGroup;
  listDept

  constructor(private doctorService: DoctorServiceService, private deptService: DeptService,
              private notify: NotifyService, private fb:FormBuilder,
              public dialogRef: MatDialogRef<CreateDoctorFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: "",
      password: "",
      fullname: "",
      email: "",
      phone: "",
      address: "",
      img: "",
      birthday: new Date(),
      deptId: 1
    })
    this.listDept = this.data.listDept
  }

  onSubmit(){
    try {


      const data = [
        {
          username: this.myForm.value.username,
          password: this.myForm.value.password,
          idrole: 1
        },
        {
          fullname: this.myForm.value.fullname,
          email: this.myForm.value.email,
          phone: this.myForm.value.phone,
          address: this.myForm.value.address,
          birthday: this.myForm.value.birthday,
          img: this.myForm.value.img,
          deptId: this.myForm.value.deptId
        }
      ]
      
      this.doctorService.createDoctor(data).subscribe(data => {
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
