import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { appointmentSchedule } from 'src/app/models/appointment-schedule';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotifyService } from 'src/app/service/notify.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { AppointmentScheduleService } from 'src/app/service/userservice/appointment-schedule.service';
import { DeptService } from 'src/app/service/userservice/dept.service';
import { DoctorService } from 'src/app/service/userservice/doctor.service';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';
import { PaymentService } from 'src/app/service/userservice/paymentservice.service';
import { ValidatorsCharacters } from 'src/app/shared/util/validators-characters';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-schedule',
  templateUrl: './registration-schedule.component.html',
  styleUrls: ['./registration-schedule.component.css']
})
export class RegistrationScheduleComponent implements OnInit {
  time = [
    { time: '07:00', class: '' },
    { time: '07:30', class: '' },
    { time: '08:00', class: '' },
    { time: '08:30', class: '' },
    { time: '09:00', class: '' },
    { time: '09:30', class: '' },
    { time: '10:00', class: '' },
    { time: '10:30', class: '' },
    { time: '11:00', class: '' },
    { time: '11:30', class: '' },
    { time: '12:00', class: '' },
    { time: '12:30', class: '' },
    { time: '13:00', class: '' },
    { time: '13:30', class: '' },
    { time: '14:00', class: '' },
    { time: '14:30', class: '' },
    { time: '15:00', class: '' },
    { time: '15:30', class: '' },
    { time: '16:00', class: '' },
    { time: '16:30', class: '' },
    { time: '17:00', class: '' },
    { time: '17:30', class: '' },
    { time: '18:30', class: '' },
    { time: '19:00', class: '' },
    { time: '19:30', class: '' },
    { time: '20:00', class: '' },
    { time: '20:30', class: '' },]
  timeOrigin = [
    { time: '07:00', class: '' },
    { time: '07:30', class: '' },
    { time: '08:00', class: '' },
    { time: '08:30', class: '' },
    { time: '09:00', class: '' },
    { time: '09:30', class: '' },
    { time: '10:00', class: '' },
    { time: '10:30', class: '' },
    { time: '11:00', class: '' },
    { time: '11:30', class: '' },
    { time: '12:00', class: '' },
    { time: '12:30', class: '' },
    { time: '13:00', class: '' },
    { time: '13:30', class: '' },
    { time: '14:00', class: '' },
    { time: '14:30', class: '' },
    { time: '15:00', class: '' },
    { time: '15:30', class: '' },
    { time: '16:00', class: '' },
    { time: '16:30', class: '' },
    { time: '17:00', class: '' },
    { time: '17:30', class: '' },
    { time: '18:30', class: '' },
    { time: '19:00', class: '' },
    { time: '19:30', class: '' },
    { time: '20:00', class: '' },
    { time: '20:30', class: '' },]
  changeColors = '';
  changeColors1 = '';
  click = false;
  class;
  button;
  online = false;
  quydoi: number;
  errorDate = false;
  listDept;
  listDoctor;
  colorTime;
  doctorSchedule = null;
  appontmentSchedule: appointmentSchedule = new appointmentSchedule();
  disableSelect = new FormControl();
  formDangKy = new FormGroup({
    phuongThuc: new FormControl(null, Validators.required),
    ngayKham: new FormControl(null, [Validators.required, ValidatorsCharacters.datePattern]),
    khoa: new FormControl(null, Validators.required),
    bacSi: new FormControl(),
    gioKham: new FormControl(null, Validators.required),
    gia: new FormControl(),
  });

  // tslint:disable-next-line:max-line-length
  constructor(private headerService: HeaderserviceService, private route: Router, private paymentService: PaymentService,
    private deptService: DeptService, private doctorService: DoctorService,
    private patient: UserserviceService, private appointService: AppointmentScheduleService,
    private authentication: AuthenticationService, private notify: NotifyService) {
    deptService.getListDept().subscribe(data => {
      this.listDept = data;
    });

  }

  ngOnInit() {
    this.appontmentSchedule.userId = this.authentication.currentUserValue.id
    this.headerService.setActive('appointment-schedule');
  }

  changeColor(click) {
    this.button = click;
    this.click = !this.click;
    console.log(click);
    if (this.click) {
      this.changeColors1 = 'change-color';
      this.formDangKy.controls.phuongThuc.setValue('Online');
      this.time = this.timeOrigin;
      this.online = true;
      this.changeColors = '';
    } else {
      this.changeColors1 = '';
      this.online = false;
      this.formDangKy.controls.phuongThuc.setValue('Offline');
      this.time = this.timeOrigin.filter((a, i) => i % 2 > 0);
      console.log(this.time);
      this.changeColors = 'change-color';

    }
    // this.formDangKy.controls['gia'].setValue(300000);
    console.log(this.formDangKy.value);

    // console.log(random);
  }

  clickDate() {
    this.class = 'date-registration-click';
    this.formDangKy.controls.khoa.setValue(null);
    this.formDangKy.controls.bacSi.setValue(null);
    this.formDangKy.controls.gioKham.setValue(null);
    for (let item of this.time) {

      item.class = '';
    }


  }
  choseDate(event) {
    if (this.formDangKy.controls.phuongThuc.value === "Offline") {

      this.appointService.getCountTime(event).subscribe(data => {
        console.log(data);
        for (let item of data) {
          console.log(this.time.find(a => a.time == item.time), item.time);
          (this.time.find(a => a.time === item.time)).class = 'btn-color-active';
        }
      })
    }
  }
  createTime() {

  }

  payment() {
    let id;
    this.appontmentSchedule.appointmentDate = new Date(this.formDangKy.controls.ngayKham.value);
    this.appontmentSchedule.appointmentTime = this.formDangKy.controls.gioKham.value;
    this.appontmentSchedule.appointmentType = this.formDangKy.controls.phuongThuc.value;
    this.appontmentSchedule.price = this.quydoi;
    console.log("schedule", this.appontmentSchedule)
    if (this.appontmentSchedule.appointmentType === "Online") {
      Swal.fire({
        title: 'Xác nhận thanh toán',
        text: 'Giá tiền là: ' + this.formDangKy.controls.gia.value + 'VNĐ  ( Được quy đổi sang là:' + this.quydoi + ' $)',
        icon: 'warning',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          this.appointService.postAppoint(this.appontmentSchedule).subscribe(data => {
            console.log(data);
            this.appontmentSchedule.idappointmentSchedule = data.idappointmentSchedule;
            this.paymentService.getPayr(this.appontmentSchedule).subscribe(data => {
              console.log(data);
              window.location.href = data.linkPayment;
            });
          });

        }
      });

    } else {
      console.log(this.appontmentSchedule);
      this.notify.notifySuccess("Thành công", "/user/appointment-schedule", "Đăng ký thành công")
      this.appointService.postAppoint(this.appontmentSchedule).subscribe(data => {
        console.log(data);
        this.appontmentSchedule.idappointmentSchedule = data.idappointmentSchedule;

      });
    }


  }

  choseDept(deptid) {
    if (this.formDangKy.controls.phuongThuc.value === "Online") {
      const date = this.formDangKy.controls.ngayKham.value;
      console.log(date + '' + deptid);
      this.doctorService.getListDoctorByDept(deptid).subscribe(data => {
        this.listDoctor = data;
      });
    }

  }

  async doctorChange(doctorid) {
    this.appontmentSchedule.doctorId = doctorid;
    let date: string = this.formDangKy.controls.ngayKham.value;
    await this.doctorService.getScheduleByDateAndDoctorId(doctorid, date).subscribe(data => {
      this.doctorSchedule = data
      const timeTemp = [];
      if (this.doctorSchedule) {
        var targetStart = new Date(date + 'T' + this.doctorSchedule.startTime);
        var targetEnd = new Date(date + 'T' + this.doctorSchedule.endTime);
        
        this.timeOrigin.forEach(x => {
          var timeCheck = new Date(date + 'T' + x.time);
          if (timeCheck <= targetEnd && timeCheck >= targetStart) {
            timeTemp.push(x);
          }
        });
      }
      this.time = timeTemp;
    });

    await this.appointService.checkDate(doctorid, date).subscribe(data => {
      this.time = this.timeOrigin.filter((time) => {
        return !data.find(d => {
          return time.time === d.appointmentTime
        })
      })
    });
  }

  // dateCheck(from:string,to:string,check:string):Boolean {
  //   var fDate,lDate,cDate;
  //   fDate = Date.parse(from);
  //   lDate = Date.parse(to);
  //   cDate = Date.parse(check);
  //   if((cDate <= lDate && cDate >= fDate)) {
  //       return true;
  //   }
  //   return false;
  // }


  clickTime(name) {
    console.log(this.errorDate);
    for (let item of this.time) {
      if (item.class !== 'btn-color-active') {
        if (item.time === name) {
          item.class = 'btn-color';
          this.formDangKy.controls.gioKham.setValue(name);
          this.appontmentSchedule.appointmentNumber = +this.time.indexOf(item);
        }
        else {

          item.class = '';
        }

      }
    }


  }

  generateTime() {
    const hh = 7;
    const mm = 0;
    const time = null;
    for (let i = 7; i < 21; i++) {

    }
  }
}

// tslint:disable-next-line:class-name
export interface scheduleRegistration {
  idappointmentSchedule: number;
  date: string;
  typeClinic: string;
  dept: string;
  patientName: string;
  doctorName: string;
  number: number;
  time: string;
  price: number;
}
