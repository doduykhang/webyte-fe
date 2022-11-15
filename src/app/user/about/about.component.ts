import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from 'src/app/service/userservice/doctor.service';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  selectfile:File;
  fileName;
  constructor(private headerService: HeaderserviceService,private route: ActivatedRoute,private doctor: DoctorService) { }
name;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['PayerID'];
      console.log('paymentId', this.name);
    });

    this.headerService.setActive('about');
  }
  changeImg(event) {
    this.selectfile = (event.target as HTMLInputElement).files[0];
    if (this.selectfile) {
      // var render = new FileReader();
      // render.readAsDataURL(this.selectfile)
      // render.onload = (event: any) => {
      // }
      this.fileName=this.selectfile.name;

    }

  }
  data={
    'fullname':'trang',
    'phone':'0820173'
  }
  uploadImg(){
 this.doctor.update(this.selectfile,this.data).subscribe(data=>{
  console.log(data);
 })
  }

}
