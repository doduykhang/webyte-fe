import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { UserserviceService } from '../../service/userservice.service';
import { NotifyService } from '../../service/notify.service';
import { Router } from '@angular/router';
import { DoctorService } from '../../service/doctorservice/doctor.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ValidatorsCharacters } from '../../shared/util/validators-characters';
import { Doctor } from '../../models/doctor';
import { ErrorStateMatcher } from '@angular/material';
import { UserInfo } from '../../models/user-info';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private userService: UserserviceService,
    private notify: NotifyService,
    private router: Router, private doctorService: DoctorService) {
  }

  addAdminForm = new FormGroup({
    userFName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    userLName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNum: new FormControl('', [Validators.required, ValidatorsCharacters.PhoneFax]),
  });
  id = 0;
  img;
  title = 'Add Employee';
  display = false;
  message;
  admin = new UserInfo();
  obj = new Doctor();
  matcher = new MyErrorStateMatcher();
  date = new Date();
  email: string

  ngOnInit() {
    this.userService.getUserInfo(this.authentication.currentUserValue.id).subscribe((data) => {
      console.log(data)
      this.admin = data
      this.email = data.email
    })
  }

  changeImg() {

    const id = this.id;
    // tslint:disable-next-line:triple-equals
    if (id == 0) {
      // this.notify.notifiError('Error',"Unverified account");
    } else {
      // this.router.navigate(['change-img', this.id]);
    }
  }

  changeInfo() {
    console.log("change info")
    this.userService.updateUser({
      ...this.addAdminForm.value,
      userId: this.authentication.currentUserValue.id,
      email: this.email
    }).subscribe(() => { this.notify.notifySuccessNotLink('Cập nhật thành công', '')})
  }

  changePass() {
    this.router.navigate(['doctor/change-password']);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

function convert(str) {
  // tslint:disable-next-line:prefer-const one-variable-per-declaration
  const date = new Date(str),
    month = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), month, day].join('-');
}
