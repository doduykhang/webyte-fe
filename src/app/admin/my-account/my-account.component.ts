import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {UserserviceService} from '../../service/userservice.service';
import {NotifyService} from '../../service/notify.service';
import {Router} from '@angular/router';
import {DoctorService} from '../../service/doctorservice/doctor.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ValidatorsCharacters} from '../../shared/util/validators-characters';
import {Doctor} from '../../models/doctor';
import {ErrorStateMatcher} from '@angular/material';
import {UserInfo} from '../../models/user-info';

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
    fullname: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    img: new FormControl(),
    birthday: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, ValidatorsCharacters.PhoneFax]),
    email: new FormControl('', [Validators.required, Validators.email, ValidatorsCharacters.EmailPattern])
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

  ngOnInit() {
    this.admin.fullname = 'Admin';
    this.admin.email = 'admin123@gmail.com';
    this.admin.img = 'bv1.jpg';
    this.admin.birthday = '01-12-2000';
    this.admin.phone = '0327248445';
    this.admin.address = 'Quận 10';
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
