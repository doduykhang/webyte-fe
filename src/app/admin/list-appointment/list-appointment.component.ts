import {Component, OnInit} from '@angular/core';
import {AppointmentScheduleService} from 'src/app/service/adminservice/appointment-schedule.service';

@Component({
  selector: 'app-list-appointment',
  templateUrl: './list-appointment.component.html',
  styleUrls: ['./list-appointment.component.css']
})
export class ListAppointmentComponent implements OnInit {
  displayedColumns: string[] = ['position', 'idAppoint', 'patientName', 'doctorName', 'date', 'status', 'typeOfClinic', 'hmm'];
  dataSource;
  listAppointOrgin;
  listAppoint;
  p: number;

  constructor(private appointService: AppointmentScheduleService) {

  }

  ngOnInit() {
    this.appointService.getListAppoint().subscribe(data => {
      this.dataSource = data;
      this.listAppointOrgin = data;
      this.listAppoint = this.listAppointOrgin;
    });
  }

  getAppoint(status) {
    if (status != null && status !== '') {
      this.listAppoint = this.listAppointOrgin.filter(a =>
        a.status === status
      );
    } else {
      this.listAppoint = this.listAppointOrgin;
    }

    this.dataSource = this.listAppoint;
  }

  xoaKhoa() {

  }

  themKhoa() {

  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', date: '01/1/2022', status: 'vv'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', date: '01/1/2022', status: 'vv'},

];
