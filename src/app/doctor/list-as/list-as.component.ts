import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {AppointmentScheduleService} from '../../service/doctorservice/appointment-schedule.service';
import {appointmentScheduleDoctor} from '../models/AppointmentSchedule';
import {Patient} from '../../models/patient';
import {NotifyService} from '../../service/notify.service';
import {DoctorService} from '../../service/doctorservice/doctor.service';
import {Doctor} from '../../models/doctor';

@Component({
  selector: 'app-list-as',
  templateUrl: './list-as.component.html',
  styleUrls: ['../doctor.component.css']
})
export class ListASComponent implements OnInit {
  public listAppSch: appointmentScheduleDoctor[];
  public listOriginal: appointmentScheduleDoctor[];
  public status: string;
  public existAppSch: boolean;
  public statusExam: boolean;
  public doctorInfo: Doctor;
  public item: appointmentScheduleDoctor;
  p: number;

  constructor(private route: Router, private appointment: AppointmentScheduleService,
              private notify: NotifyService, private doctorService: DoctorService) {
    this.status = 'Tất cả';
    this.statusExam = true;
    this.doctorInfo = this.doctorService.currentDoctorValue;
  }

  ngOnInit() {
    this.getListAppointmentSchedule();
  }



  checkTimeWithRealTime(time: string, date: string) {
    const today = new Date();
    const realDay =  ('0' + today.getDate()).slice(-2) + '-'  + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();
    // console.log('realDay = ' + realDay + ' ---  date = ' + date);
    // const realTime = today.getHours() + ':' + today.getMinutes();
    // console.log('realTime = ' + realTime);
    if (date === realDay) {
      return true;
    }
    return false;
  }

  getListAppointmentSchedule() {
    this.appointment.getListAppointByDoctor(this.doctorInfo.doctorid).subscribe(data => {
      if (data) {
        this.existAppSch = true;
        this.listAppSch = data;
        this.listOriginal = data;
        console.log(data);
      }
    }, error => {
      this.existAppSch = false;
      console.log(error);
    });
  }

  checkMedicalStatus(check: string) {
    if (check === 'Đã khám') {
      return true;
    }
  }

  getListAppSch() {
    this.status = 'Tất cả';
    if (this.existAppSch) {
      this.listAppSch = this.listOriginal;
    } else {
      this.notify.notifyErrorToggerMessage('Danh sách trống');
    }
  }

  getListWaiting() {
    this.status = 'Chờ khám';
    if (this.existAppSch) {
      this.listAppSch = this.listOriginal.filter(value => value.status === 'Chờ khám');
    } else {
      this.notify.notifyErrorToggerMessage('Danh sách trống');
    }
  }

  getListExam() {
    this.status = 'Đã khám';
    if (this.existAppSch) {
      this.listAppSch = this.listOriginal.filter(value => value.status === 'Đã khám');
    } else {
      this.notify.notifyErrorToggerMessage('Danh sách trống');
    }
  }

  chiTiet(id: number) {
    this.route.navigate(['/doctor/listASdetail', id]);
  }

  vaoKham(patientName: string, time: string, id: number) {
    this.appointment.updateStatusAppSch(id, 'Đã khám').subscribe(data => {
      if (data) {
        console.log(data);
      }
    });
    this.notify.confirmSuccess('Bạn có chắc chắn không?', 'Bạn sẽ không thể hoàn nguyên điều này!',
      'Vâng, tôi đồng ý!', 'Xác nhận vào khám bệnh nhân ' + patientName, 'Thời gian vào khám: ' + time + 'H');
  }
}
