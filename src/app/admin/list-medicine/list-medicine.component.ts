import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { NotifyService } from 'src/app/service/notify.service';
import { MedicineService } from '../../service/adminservice/medicine.service';
import { UpdateDepartmentFormComponent } from '../department/update-department-form/update-department-form.component';
import { CreateMedicineFormComponent } from './create-medicine-form/create-medicine-form.component';
import { UpdateMedicineFormComponent } from './update-medicine-form/update-medicine-form.component';

@Component({
	selector: 'app-list-medicine',
	templateUrl: './list-medicine.component.html',
	styleUrls: ['./list-medicine.component.css']
})
export class ListMedicineComponent implements OnInit {
	listMedicine;
	listMedicineOriginal;
	p: number;
	searchForm = this.formBuilder.group({
		query: '',
	});
	constructor(private medicineService: MedicineService,
		public dialog: MatDialog,
		public notify: NotifyService,
		private formBuilder: FormBuilder
	) { }



	loadMedicine(name: string = "", page: number = 0, size: number = 1000) {
		this.medicineService.getListMedicine(name, page, size).subscribe(data => {
			this.listMedicineOriginal = data;
			this.listMedicine = this.listMedicineOriginal;
		});
	}

	ngOnInit() {
		this.loadMedicine()
	}

	create() {
		const dialogRef = this.dialog.open(CreateMedicineFormComponent, {
			width: '500px',
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadMedicine()
		});
	}

	update(item) {
		const dialogRef = this.dialog.open(UpdateMedicineFormComponent, {
			width: '500px',
			data: item
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadMedicine()
		});
	}

	delete(item) {
		this.notify.xoaThuoc(item.medicineId)
	}

	onSearch() {
		this.loadMedicine(this.searchForm.value.query, 0, 1000)
	}

}
