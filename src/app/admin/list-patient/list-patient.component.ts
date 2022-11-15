import {Component, OnInit} from '@angular/core';
import {PatientServiceService} from 'src/app/service/adminservice/patient-service.service';
import {NotifyService} from '../../service/notify.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  displayedColumns: string[] = ['position', 'patientName', 'phone', 'brithday', 'email', 'hmm'];
  dataSource;
  listPatientOrigin;
  listAppoint;
  p: number;

  constructor(private patientService: PatientServiceService, private notify: NotifyService) {

  }


  ngOnInit() {
    this.patientService.getListDoctor().subscribe(data => {
      this.listPatientOrigin = data;
      console.log(data);
      this.dataSource = this.listPatientOrigin;
    });
  }
  xoaBenhNha(id: number) {
    this.notify.xoaBenhNhan(id);
  }
}
