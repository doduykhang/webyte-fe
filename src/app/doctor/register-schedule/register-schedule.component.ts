import { SelectionModel } from '@angular/cdk/collections';
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as moment from 'moment';
import { ScheduleService } from '../../service/doctorservice/schedule.service';
import { DoctorService } from '../../service/doctorservice/doctor.service';
import { Schedule } from '../models/schedule';
import { Doctor } from '../../models/doctor';
import { NotifyService } from '../../service/notify.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register-schedule',
  templateUrl: './register-schedule.component.html',
  styleUrls: ['./register-schedule.component.css']
})
export class RegisterScheduleComponent implements OnInit, DoCheck {
  doctorInfo: Doctor;
  public listSchedule: Schedule[];
  public listScheduleExist: Schedule[];
  checkSaturday: boolean;

  constructor(private scheduleService: ScheduleService, private doctorService: DoctorService,

    private notify: NotifyService) {
    this.doctorInfo = this.doctorService.currentDoctorValue;
    this.checkSaturday = false;
  }

  displayedColumns: string[] = ['select', 'position', 'weekdays', 'date', 'startTime', 'endTime', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  ngDoCheck(): void {
    console.log(this.selection);
  }


  ngOnInit() {
    let date = new Date();
    console.log(date.getDate());

var currentDate = moment();

  var weekStart = currentDate.clone().startOf('isoWeek');
    // if (date.getDate() !== 6) {
    for (let i = 1; i < 8; i++) {
      const day = weekStart.add(1, 'days').format('YYYY MM DD');
      date = new Date(day);

      ELEMENT_DATA[i - 1].dayOfWeekStr = formatDate(date, "dd/MM/yyyy", 'en-US');
      ELEMENT_DATA[i - 1].dayOfWeek = date.toISOString();
      ELEMENT_DATA[i - 1].weekdays = this.changeDay(date.getDay());
      ELEMENT_DATA[i - 1].status = 'Chưa đăng ký';
      console.log(day)
    }
    this.getListScheduleOfDoctor();

    // }
    // else {
    //   this.getListScheduleOfDoctor();
    // }
  }
  getCurrentWeek() {
  var currentDate = moment();

  var weekStart = currentDate.clone().startOf('isoWeek');
  var weekEnd = currentDate.clone().endOf('isoWeek');

  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd"));
  }
  return days;
}

  getListScheduleOfDoctor() {
    this.scheduleService.getListSchedule(this.doctorInfo.userId).toPromise().then(
      data => {
        if (data) {
          this.listSchedule = data;
          // let dateNow = new Date();
          // for (let i = 0; i < this.listSchedule.length; i++) {
          //   const date = new Date(this.listSchedule[i].dayOfWeek);

          //   const dateIndex = date.getDay()
          //   console.log("date index", dateIndex)
          //   const day = moment().add(i, 'days');
          //   // @ts-ignore
          //   dateNow = new Date(day);
          //   if (date.getDate() === dateNow.getDate()) {
          //     ELEMENT_DATA[dateIndex].status = 'Đã đăng ký';
          //   }
          //   ELEMENT_DATA[dateIndex].dayOfWeek = date.toISOString();
          //   ELEMENT_DATA[dateIndex].dayOfWeekStr = formatDate(date.toISOString(), "dd/MM/yyyy", 'en-US');
          //   ELEMENT_DATA[dateIndex].weekdays = this.changeDay(date.getDay());
          //   ELEMENT_DATA[dateIndex].status = 'Đã đăng ký';
          //   ELEMENT_DATA[dateIndex].startTime = this.listSchedule[i].startTime;
          //   ELEMENT_DATA[dateIndex].endTime = this.listSchedule[i].endTime;
          // }

          let date = new Date();
          for (let i = 1; i < 8; i++) {
            const day = moment().add(i, 'days').format('YYYY MM DD');
            date = new Date(day);
            const schedule = this.listSchedule.find(x=>formatDate(x.dayOfWeek, "dd/MM/yyyy", 'en-US') === ELEMENT_DATA[i - 1].dayOfWeekStr);
            if(schedule){
              ELEMENT_DATA[i - 1].status = 'Đã đăng ký';
              ELEMENT_DATA[i - 1].startTime = schedule.startTime;
              ELEMENT_DATA[i - 1].endTime = schedule.endTime;
              this.selection.toggle(ELEMENT_DATA[i - 1]);
            }
            // if(formatDate(this.listSchedule[i-1].dayOfWeek, "dd/MM/yyyy", 'en-US') == formatDate(date.toISOString(), "dd/MM/yyyy", 'en-US')){
            //   ELEMENT_DATA[i - 1].dayOfWeek = date.toISOString();
            //   ELEMENT_DATA[i - 1].dayOfWeekStr = formatDate(date.toISOString(), "dd/MM/yyyy", 'en-US');
            //   ELEMENT_DATA[i - 1].weekdays = this.changeDay(date.getDay());
            //   ELEMENT_DATA[i - 1].status = 'Đã đăng ký';
            //   ELEMENT_DATA[i - 1].startTime = this.listSchedule[i-1].startTime;
            //   ELEMENT_DATA[i - 1].endTime = this.listSchedule[i-1].endTime;
            // }
          }
        }
      }, error => {
        this.notify.notifiError('Lỗi', 'Không tồn tại danh sách đăng ký lịch trực');
      }
    );
  }

  registerListScheduleOfDoctor() {
    for (let i = 2; i < 9; i++) {

    }
  }

  // tslint:disable-next-line:variable-name
  changeDay(current_day) {
    // tslint:disable-next-line:variable-name
    let day_name;
    switch (current_day) {
      case 0:
        day_name = 'Chủ nhật';
        break;
      case 1:
        day_name = 'Thứ hai';
        break;
      case 2:
        day_name = 'Thứ ba';
        break;
      case 3:
        day_name = 'Thứ tư';
        break;
      case 4:
        day_name = 'Thứ năm';
        break;
      case 5:
        day_name = 'Thứ sáu';
        break;
      case 6:
        day_name = 'Thứ bảy';
    }
    return day_name;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;

  }

  changeDateStart(e, row?: PeriodicElement) {
    if (row.endTime && row.startTime >= row.endTime) {
      e.target.value = null;
      this.notify.notifiError('Lỗi', 'Giờ kết thúc không thể bé hơn giờ bắt đầu');
    }
  }

  changeDateEnd(e, row?: PeriodicElement) {
    if (row.startTime && row.startTime >= row.endTime) {
      e.target.value = null;
      this.notify.notifiError('Lỗi', 'Giờ kết thúc không thể bé hơn giờ bắt đầu');
    }
  }

  register() {
    this.scheduleService.createSchedule(this.selection.selected, this.doctorInfo.userId).toPromise().then(
      data => {
        this.notify.notifySuccessToggerMessage('Đăng ký lịch trực thành công');
      }, 
      error => {
        this.notify.notifiError('Lỗi', 'Không tồn tại danh sách đăng ký lịch trực');
      }
    );
  }
}

export interface PeriodicElement {
  weekdays: string;
  position: number;
  dayOfWeek: string;
  startTime: string,
  endTime: string,
  status: string;
  dayOfWeekStr: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 2, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 3, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 4, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 5, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 6, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },
  { position: 7, weekdays: '', dayOfWeek: '', startTime: "", endTime: "", status: 'H', dayOfWeekStr: '' },

];
