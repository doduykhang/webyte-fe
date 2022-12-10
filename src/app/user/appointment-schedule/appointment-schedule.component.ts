import {Component, DoCheck, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {NotifyService} from 'src/app/service/notify.service';
import {AppointmentScheduleService} from 'src/app/service/userservice/appointment-schedule.service';
import {HeaderserviceService} from 'src/app/service/userservice/headerservice.service';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserserviceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.css']
})
export class AppointmentScheduleComponent implements OnInit, DoCheck {
  constructor(private headerService: HeaderserviceService, private route: Router, 
              private appoinentService: AppointmentScheduleService, private notify: NotifyService,
	     private authentication: AuthenticationService, private patient: UserserviceService) {

  }


  listAppointmentScheduleOrigin;
  listAppointmentSchedule;
  room = false;
  dateNow = new Date();

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  p: number;

  ngDoCheck(): void {
    // let datenow = Date.now();
    // let datenow1 = moment(datenow).add(-10, 'minutes').format('HH:mm');
    // for (let item of this.listAppointmentScheduleOrigin) {
    //   let dateAppoint = new Date(item.date).getTime();
    //   if (item.status === "Chờ khám" && dateAppoint == datenow) {
    //     if (item.time == datenow1.toString()) {

    //     }
    // tslint:disable-next-line:max-line-length
    //     this.notify.notifySuccessNotLink("Chuẩn bị khám", "Bạn có một lịch khám vào lúc:" + item.time + "với bác sĩ:" + item.doctorName + " 10p nữa sẽ đến giờ khám" + ".Vui lòng chuẩn bị vào khám");
    //   }

    // }

  }

  async ngOnInit() {
    this.headerService.setActive('appointment-schedule');
    let id = this.authentication.currentUserValue.id;

    	this.appoinentService.getListAppointOfUser(id).subscribe((data) => {
      		this.listAppointmentScheduleOrigin = data;
      		this.listAppointmentSchedule = this.listAppointmentScheduleOrigin;
      		console.log(data);
    	});
    this.headerService.setActive('appointment-schedule');
  }

  clickItemAppointment(item) {
    console.log(item);    
    if (item.typeClinic === 'offline' && item.status === 'registered') {
      // tslint:disable-next-line:max-line-length
      this.notify.notifyNotLink('<p>Số thứ tự của bạn là:</p><strong>' + item.number + '</strong>', 'Thời gian khám dự kiến <b>' + item.time + '</b>, ' +
        '<p>Bạn vui lòng có mặt trước bệnh viện<b> trước 10 phút </b> để hoàn tất thủ tục đăng ký</p> ', 'info');
    } else if (item.typeClinic === 'online' && item.status === 'registered') {
      // tslint:disable-next-line:max-line-length
      this.notify.notifyNotLink('<p>Ngày khám của bạn là:</p><strong>' + item.number + '</strong>', 'Thời gian khám dự kiến <b>' + item.time + '</b>, ' +
        '<p>Bạn vui lòng vào website <b> trước 5 phút </b> để chuẩn bị cho quá trình khám</p> ', 'info');
    } else if (item.status === 'finished') {
      const date = moment(item.date).format('DD-MM-yyyy');
      this.route.navigate(['user/appoint-detail', item.idappointmentSchedule, date]);
    } else if (item.status === 'waiting') {
      const date = new Date(item.date);
      if (date.getDate() === this.dateNow.getDate()) {
        const datenow2 = moment(this.dateNow);
        const dates = moment(item.date).format('YYYY-MM-DD');
        const datemin = moment(dates + ' ' + item.time).add(-10, 'minutes');
        const datemax = moment(dates + ' ' + item.time);

        console.log(datenow2.format('HH:mm'), datemin.format('HH:mm'), datemax.format('HH:mm'), dates, item.time);
        if (datenow2 > datemin && datenow2 < datemax) {
          this.notify.notifySuccess('chuẩn bị tới giờ khám', '/user/video-call', 'Vui lòng truy cập vào link dưới để tiến hành khám');
        } else {
          // tslint:disable-next-line:max-line-length
          this.notify.notifyNotLink('<p>Ngày khám của bạn là:</p><strong>' + moment(item.date).format('DD-MM-yyyy') + '</strong>', 'Thời gian khám dự kiến <b>' + item.time + '</b>, ' +
            '<p>Bạn vui lòng vào website <b> trước 5 phút </b> để chuẩn bị cho quá trình khám</p> ', 'info');
        }
      } else {
        // tslint:disable-next-line:max-line-length
        this.notify.notifyNotLink('<p>Ngày khám của bạn là:</p><strong>' + moment(item.date).format('DD-MM-yyyy') + '</strong>', 'Thời gian khám dự kiến <b>' + item.time + '</b>, ' +
          '<p>Bạn vui lòng vào website <b> trước 5 phút </b> để chuẩn bị cho quá trình khám</p> ', 'info');
      }
    }
  }

  registrationSchedule() {
    this.route.navigate(['user/registration-schedule']);


  }

  clickOffline(click) {

    if (click === 'Online' || click === 'Offline') {
      this.listAppointmentSchedule = this.listAppointmentScheduleOrigin.filter(a => a.typeClinic === click);
    } else if (click === 'Đã đăng ký' || click === 'Đã hủy' || click === 'Đã khám') {
      this.listAppointmentSchedule = this.listAppointmentScheduleOrigin.filter(a => a.status === click);
    } else {
      this.listAppointmentSchedule = this.listAppointmentScheduleOrigin;
    }

  }
}
