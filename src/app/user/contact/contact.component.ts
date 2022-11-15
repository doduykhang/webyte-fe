import { Component, OnInit } from '@angular/core';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private headerService: HeaderserviceService) { }

  ngOnInit() {
    this.headerService.setActive('contact');
  }

}
