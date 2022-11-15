import { Component, OnInit } from '@angular/core';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';
import { NewsService } from 'src/app/service/userservice/news.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  news;
  // = [
  //   {
  //     img: 'hinhbv4.jpg',
  //     title: 'Warner Music Group buys concert discovery service Songkick',
  //     // tslint:disable-next-line:max-line-length
  //     text: 'Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major',
  //     date: '01-12-2021'
  //   },
  //   {
  //     img: 'hinhbv5.jpg',
  //     title: 'Warner Music Group buys concert discovery service Songkick',
  //     // tslint:disable-next-line:max-line-length
  //     text: 'Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major',
  //     date: '01-12-2021'
  //   },
  //   {
  //     img: 'hinhbv4.jpg',
  //     title: 'Warner Music Group buys concert discovery service Songkick',
  //     // tslint:disable-next-line:max-line-length
  //     text: 'Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major',
  //     date: '01-12-2021'
  //   },
  //   {
  //     img: 'hinhbv5.jpg',
  //     title: 'Warner Music Group buys concert discovery service Songkick',
  //     // tslint:disable-next-line:max-line-length
  //     text: 'Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major',
  //     date: '01-12-2021'
  //   },
  //   {
  //     img: 'hinhbv4.jpg',
  //     title: 'Warner Music Group buys concert discovery service Songkick',
  //     // tslint:disable-next-line:max-line-length
  //     text: 'Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark. Songkick has been involved in a lawsuit against the major',
  //     date: '01-12-2021'
  //   },

  // ];

  constructor(private headerService: HeaderserviceService, private newsService: NewsService) {
    newsService.getListNews().subscribe((data) => {
      this.news = data;
    })
  }

  ngOnInit() {
    this.headerService.setActive('home');
  }

}
