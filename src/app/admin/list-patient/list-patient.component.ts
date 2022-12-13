import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {PatientServiceService} from 'src/app/service/adminservice/patient-service.service';
import {NotifyService} from '../../service/notify.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {
  searchForm = this.formBuilder.group({
		query: '',
	});
  displayedColumns: string[] = ['position', 'userFName', 'userLName', 'phoneNum', 'birthDate', 'email'];
  dataSource;
  listPatientOrigin;
  listAppoint;
  p: number;

  constructor(private patientService: PatientServiceService, private notify: NotifyService,
		private formBuilder: FormBuilder) {

  }

  loadNews(name: string = "", page: number = 0, size: number = 1000) {
    this.patientService.getListPatient(name, page, size).subscribe(data => {
      this.listPatientOrigin = data;
      console.log(data);
      this.dataSource = this.listPatientOrigin;
    });
	}

  ngOnInit() {
    this.loadNews();
  }

  xoaBenhNha(id: number) {
    this.notify.xoaBenhNhan(id);
  }

  onSearch() {
		this.loadNews(this.searchForm.value.query, 0, 1000)
	}
}
