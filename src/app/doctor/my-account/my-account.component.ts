import {Component, OnInit} from '@angular/core';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication.service';
import {UserserviceService} from '../../service/userservice.service';
import {NotifyService} from '../../service/notify.service';
import {HeaderserviceService} from '../../service/userservice/headerservice.service';
import {Router} from '@angular/router';
import {ValidatorsCharacters} from '../../shared/util/validators-characters';
import {Doctor} from '../../models/doctor';
import {DoctorService} from '../../service/doctorservice/doctor.service';

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

  addDoctorForm = new FormGroup({
    userFName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
    userLName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
    birthDate: new FormControl('', [Validators.required]),
    phoneNum: new FormControl('', [Validators.required, ValidatorsCharacters.PhoneFax]),
  });
  id = 0;
  img;
  title = 'Add Employee';
  display = false;
  message;
  doctor = new Doctor();
  obj = new Doctor();
  matcher = new MyErrorStateMatcher();
  date = new Date();
  email: string

  ngOnInit() {
	  this.userService.getUserInfo(this.authentication.currentUserValue.id).subscribe((data) => {
		console.log(data)
		this.doctor = data
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
    this.obj = this.addDoctorForm.value;
    this.obj.birthday = convert(this.addDoctorForm.value.birthday);
    this.obj.userId = this.doctor.userId;
    this.obj.accountid = this.doctor.accountid;
    console.log(this.obj);
    this.doctorService.updateDoctor(this.obj).subscribe(data => {
      if (data != null) {
        this.notify.notifySuccessToggerMessage('Thay đổi thông tin thành công');
      }
    }, error => {
      this.notify.notifiError('Lỗi thông tin thay đổi!!!', 'Vui lòng nhập lại');
    });
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
