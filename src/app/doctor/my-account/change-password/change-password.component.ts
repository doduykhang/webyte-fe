import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../../../service/userservice.service';
import { AuthenticationService } from '../../../service/authentication.service';
import { DoctorService } from '../../../service/doctorservice/doctor.service';
import Validation from '../../../user/my-account/change-password/validation';
import { NotifyService } from 'src/app/service/notify.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  id: number;
  pass: string;
  newPass: string;
  currentDoctor: any;
  isSuccessful = false;
  errorMessage = '';
  isChangeFail = false;
  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserserviceService,
    private authService: AuthenticationService,
    private doctorService: DoctorService,
    private notify: NotifyService) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('newPassword', 'confirmPassword')],
      }
    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(this.authService.currentUserValue);
    this.id = this.authService.currentUserValue.id;
    this.pass = this.form.value.password;
    this.newPass = this.form.value.newPassword;

    this.userService.changePassword({
      id: this.id,
      oldPassword: this.pass,
      newPassword: this.newPass
    }).subscribe(() => {
      this.notify.notifySuccessNotLink('Đổi mật khẩu thành công', '')
      window.location.href='/#/doctor/my-account';
    }
    )
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
