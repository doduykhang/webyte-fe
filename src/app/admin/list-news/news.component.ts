import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../service/adminservice/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  listNews;
  p: number;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getListNews().subscribe( data => {
      if (data) {
        this.listNews = data;
      }
    });
  }

}
