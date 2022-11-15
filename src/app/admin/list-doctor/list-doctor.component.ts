import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material';
import {DeptService} from 'src/app/service/adminservice/dept.service';
import {DoctorServiceService} from 'src/app/service/adminservice/doctor-service.service';
import {DoctorService} from 'src/app/service/doctorservice/doctor.service';
import {NotifyService} from '../../service/notify.service';
import { CreateDoctorFormComponent } from './create-doctor-form/create-doctor-form.component';
import { UpdateDoctorFormComponent } from './update-doctor-form/update-doctor-form.component';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  constructor(private doctorService: DoctorServiceService, private deptService: DeptService,
              private notify: NotifyService, public dialog: MatDialog) {
  }

  listDoctor;
  listDoctorOrigin;
  listDept;
  dept: FormControl = new FormControl('Lọc theo khoa');
  p: number;

  loadDoctor(){
    this.doctorService.getListDoctor().subscribe(data => {
      this.listDoctorOrigin = data;
      this.listDoctor = this.listDoctorOrigin;
    });
    this.deptService.getListDept().subscribe(data => {
      this.listDept = data;
    });
  }

  ngOnInit() {
    this.loadDoctor()
  }

  filterDept(deptId) {
    console.log(deptId);
    if (deptId !== 0 && deptId != null) {
      this.listDoctor = this.listDoctorOrigin.filter(a => a.deptid === deptId);
    } else {
      this.listDoctor = this.listDoctorOrigin;
    }
  }
  async xoaBacSi(id: number) {
    await this.notify.xoaBacSi(id);
    this.loadDoctor()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDoctorFormComponent, {
      width: '250px',
      data: {listDept: this.listDept}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadDoctor()
    });
  }

  openDialogUpdate(data: any): void {
    const dialogRef = this.dialog.open(UpdateDoctorFormComponent, {
      width: '250px',
      data: {listDept: this.listDept, doctor: data}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadDoctor()
    });
  }

}
