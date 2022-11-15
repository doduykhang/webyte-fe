import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserserviceService} from '../../../service/userservice.service';
import {AuthenticationService} from '../../../service/authentication.service';
import {DoctorService} from '../../../service/doctorservice/doctor.service';
import Validation from '../../../user/my-account/change-password/validation';

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
              private doctorService: DoctorService) { }

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
    console.log(this.id);
    this.pass = this.form.value.password;
    this.newPass = this.form.value.newPassword;
    console.log(this.pass);
    console.log(this.newPass);
    this.userService.checkPassword(this.id, this.pass).subscribe(
      (data) => {
        console.log(data);
        console.log(this.id, this.pass, this.newPass);
        if (data === true) {
          this.userService.changePassword(this.id, this.newPass)
            .subscribe((data1) => {
                this.isSuccessful = true;
                this.isChangeFail = false;
              },
              (err) => {
                // this.errorMessage = err.error.message;
                this.isChangeFail = true;
              });
        } else {
          this.isSuccessful = false;
          this.isChangeFail = true;
        }
      },
      (err1) => {
        // this.errorMessage = err1.error.message;
        this.isChangeFail = true;
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
