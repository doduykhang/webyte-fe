import { Component, OnInit } from '@angular/core';
import {HeaderserviceService} from '../../../service/userservice/headerservice.service';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ValidatorsCharacters} from '../../../shared/util/validators-characters';
import {NotifyService} from '../../../service/notify.service';
import {UserserviceService} from '../../../service/userservice.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../service/alert.service';
import {ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../login.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  submitted = false;
  loading = false;
  path = '';
  error = '';
  matcher = new MyErrorStateMatcher();
  constructor(private headerService: HeaderserviceService, private formBuilder: FormBuilder,
              private notify: NotifyService, private userService: UserserviceService,
              private router: Router, private alertService: AlertService) { }
  formForget: FormGroup;
  ngOnInit() {
    this.headerService.setActive('login');
    this.formForget = this.formBuilder.group({
      email: ['', [Validators.minLength(5), Validators.maxLength(40), Validators.required, ValidatorsCharacters.EmailPattern]]
    });
  }
  sendEmail() {
    this.submitted = true;

    if (this.formForget.invalid) {
      return;
    }
    this.email = this.formForget.value.email;
    this.loading = true;
    console.log(this.email);
    this.userService.forgotPassword(this.email).toPromise().then(data => {
      if (data != null) {
        this.notify.notifySuccessToggerMessage('Mật khẩu mới đã được gửi qua email!!!');
        this.router.navigate([this.path + '/login']);
      } else {
        this.loading = false;
      }
    }, error1 => {
      this.alertService.error(error1);
      this.loading = false;
    });
  }

  get f() {
    return this.formForget.controls;
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}
