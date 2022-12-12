import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DoctorService } from 'src/app/service/userservice/doctor.service';
import { HeaderserviceService } from 'src/app/service/userservice/headerservice.service';
import { NewsService } from 'src/app/service/userservice/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  constructor(private headerService: HeaderserviceService, private route: ActivatedRoute, private news: NewsService) { }
  data;
  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      let { newsId } = param;
      console.log(newsId)
      this.news.getListNews().subscribe(data1 => {
        this.data = data1.find(x => x.newsId == newsId)

        var content = document.getElementById("content");
        content.innerHTML = this.data.text;
      })
    });
    this.headerService.setActive('about');  
  }
}
