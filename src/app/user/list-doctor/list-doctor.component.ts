import {Component, OnInit} from '@angular/core';
import * as internal from 'assert';
import {DeptService} from 'src/app/service/userservice/dept.service';
import {DoctorService} from 'src/app/service/userservice/doctor.service';
import {HeaderserviceService} from 'src/app/service/userservice/headerservice.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {
  listDoctor;
  listDoctorTam;
  //   {name: 'Bác sĩ A', phone: '032724567', email: 'phantrang011220@gmail.com', khoa: 'Khoa A', img: 'bv1.jpg'},
  //   {name: 'Bác sĩ A', phone: '032724567', email: 'phantrang011220@gmail.com', khoa: 'Khoa A', img: 'bv1.jpg'},
  //   {name: 'Bác sĩ A', phone: '032724567', email: 'phantrang011220@gmail.com', khoa: 'Khoa A', img: 'bv1.jpg'},
  //   {name: 'Bác sĩ A', phone: '032724567', email: 'phantrang011220@gmail.com', khoa: 'Khoa A', img: 'bv1.jpg'}

  listKhoa: dept;
  slides = [
    {image: './assets/imglogin.png', text: 'Khoa: khoa Nội', title: 'Nguyen văn A'},
    {image: './assets/imglogin.png', text: 'khoa: khoa Nội', title: 'Nguyen văn B'},
    {image: './assets/imglogin.png', text: 'khoa: khoaA', title: 'Nguyen văn C'},
    {image: './assets/imglogin.png', text: 'khoa: khoaA', title: 'Nguyen văn D'},
    {image: './assets/imglogin.png', text: 'khoa: khoaA', title: 'Nguyen văn E'}
  ];
  p: number;

  constructor(private headerService: HeaderserviceService, private doctorService: DoctorService, private deptService: DeptService) {
    doctorService.getListDoctor().subscribe((data) => {
      this.listDoctor = data;
      this.listDoctorTam = data;
      console.log(this.listDoctor);
    });
    deptService.getListDept().subscribe((data) => {
      this.listKhoa = data;
      console.log(this.listKhoa);
    });


  }

  ngOnInit() {
    this.headerService.setActive('list-doctor');
  }

  listDept(deptName) {
    const list = [];
    let item: any;
    console.log(deptName);
    if (deptName !== undefined) {
      for (item of this.listDoctorTam) {
        console.log(item);
        if (item.deptname === deptName) {
          list.push(item);
        }

      }
      this.listDoctor = list;
    } else {
      this.listDoctor = this.listDoctorTam;
    }

    console.log(list + deptName);
  }

}

export interface Doctor {
  name: string;
  address: string;
  phone: string;
  email: string;
  id: number;
  username: string;
}

// tslint:disable-next-line:class-name
export interface dept {
  id: number;
  name: string;
}
