import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeptService } from 'src/app/service/adminservice/dept.service';
import { NotifyService } from '../../service/notify.service';
import { CreateDepartmentFormComponent } from './create-department-form/create-department-form.component';
import { UpdateDepartmentFormComponent } from './update-department-form/update-department-form.component';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

	constructor(private deptService: DeptService, private notify: NotifyService,
		public dialog: MatDialog, private formBuilder: FormBuilder
	) {
	}

	searchForm = this.formBuilder.group({
    		query: '',
  	});

	dataSource;
	p: number = 0;
	seachQuery: string = "test"

	loadDept(title: string, page: number, size: number) {
		this.deptService.getListDept(title, page, size).subscribe(data => {
			this.dataSource = data;
		});
	}

	ngOnInit() {
		this.loadDept("", 0, 1000)
	}

	xoaKhoa(id) {
		this.notify.xoaKhoa(id);
	}

	update(item) {
		const dialogRef = this.dialog.open(UpdateDepartmentFormComponent, {
			width: '500px',
			data: item
		});

		dialogRef.afterClosed().subscribe(result => {
			this.loadDept("", 0, 1000)
		});
	}

	openCreate() {
		const dialogRef = this.dialog.open(CreateDepartmentFormComponent, {
			width: '500px',
		});

		dialogRef.afterClosed().subscribe(result => {
			this.loadDept("", 0, 1000)
		});
	}

	onSearch() {
		console.log(this.searchForm.value.query)
		this.loadDept(this.searchForm.value.query, 0, 1000)
	}
}
