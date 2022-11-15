import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { AppointmentScheduleService } from 'src/app/service/doctorservice/appointment-schedule.service';
import { DoctorService } from 'src/app/service/doctorservice/doctor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../doctor.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private doctorService: DoctorService, private appointService: AppointmentScheduleService) {
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  barChartData =
    [
      { data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A' },
      { data: [0, 1, 0, 1, 0, 0, 80], label: 'hmmm' }
    ];
  public barChartItem: Barchar = new Barchar();
  public barChartItemCancle: Barchar = new Barchar();
  // [
  //   {data: [75, 49, 89, 31, 86, 35, 50], label: 'Series A'},
  //   {data: [48, 38, 65, 39, 66, 17, 80], label: 'Series B'}
  // ];
  doctor;
  sum=0;
  sumhuy=0;
  sumtong=0;
  ngOnInit() {
    this.doctor = this.doctorService.currentDoctorValue;
    this.appointService.getListChart(this.doctor.doctorid).subscribe(data => {
      console.log(data);
      for (let item = 0; item < 7; item++) {
        this.barChartData[0].data[item] = data.listDateSuccess[item].count;
        this.barChartData[0].label = "Đã khám";
        this.barChartData[1].data[item] = data.listDateError[item].count;
        this.barChartData[1].label = "Đã Hủy";
        this.sumhuy+=this.barChartData[1].data[item];
        this.sum+=this.barChartData[0].data[item];
        this.barChartLabels.push(data.listDateSuccess[item].date);
      }
      this.sumtong=this.sum+this.sumhuy;
    })


  }


}
export class Barchar {
  data: number[] = [];
  label: string = '';
}


