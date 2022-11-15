import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'src/app/service/notify.service';
import { AppointmentScheduleService } from 'src/app/service/userservice/appointment-schedule.service';
import { PaymentService } from 'src/app/service/userservice/paymentservice.service';
import { scheduleRegistration } from '../registration-schedule.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payerid;
  paymentId;
  token
  success;
  id;
  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private notifyService: NotifyService, private appointService: AppointmentScheduleService) {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'];
      this.id = +params['id'];
      this.payerid = params['PayerID'];
      this.token = params['token'];
      console.log('paymentId', this.payerid);
      console.log('paymentId', this.paymentId);
      console.log('Id', this.id);
    });
  }
  scheduleRegister: scheduleRegistration;
  formPayment: FormGroup;
   ngOnInit() {
    this.appointService.getItemAppoint(this.id).subscribe(data => {
      this.scheduleRegister = data;
      console.log(data);
      console.log(this.scheduleRegister);
    })
  }
  payment() {
    this.paymentService.confirmPay(this.paymentId, this.payerid,this.scheduleRegister).subscribe(data => {
      console.log(data);
      this.success = data.success;
        console.log(this.success);
      if (this.success === "success") {
        this.notifyService.notifySuccess('Thành công', 'user/appointment-schedule', 'Thanh toán thành công');
        console.log("thành công");
      }


    })
  }
}
