import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import {DeptService} from 'src/app/service/adminservice/dept.service';
import {NotifyService} from '../../service/notify.service';
import { CreateDepartmentFormComponent } from './create-department-form/create-department-form.component';
import { UpdateDepartmentFormComponent } from './update-department-form/update-department-form.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private deptService: DeptService, private notify: NotifyService,
              public dialog: MatDialog
    ) {
  }

  dataSource;
  p: number;

  loadDept(){
    this.deptService.getListDept().subscribe(data => {
      this.dataSource = data;
    });
  }

  ngOnInit() {
    this.loadDept()
  }

  xoaKhoa(id) {
    this.notify.xoaKhoa(id);
  }

  update(item) {
    const dialogRef = this.dialog.open(UpdateDepartmentFormComponent, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadDept()
    });
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateDepartmentFormComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {

      this.loadDept()
    });
  }
}
