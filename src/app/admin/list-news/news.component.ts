import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/adminservice/news.service';
import { NewsService as UserNewsSerivce } from '../../service/userservice/news.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialog } from '@angular/material';
import { CreateNewsFormComponent } from './create-news-form/create-news-form.component';
import { UpdateNewsFormComponent } from './update-news-form/update-news-form.component';

@Component({
	selector: 'app-list-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	listNews;
	p: number;
	constructor(private newsService: NewsService,
		private userNewsService: UserNewsSerivce,
		public dialog: MatDialog,
		public notify: NotifyService
	) { }

	ngOnInit() {
		this.loadNews()
	}

	loadNews() {

		this.newsService.getListNews().subscribe(data => {
			if (data) {
				this.listNews = data;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(CreateNewsFormComponent, {
			width: '250px',
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadNews()
		});
	}

	update(item) {

		const dialogRef = this.dialog.open(UpdateNewsFormComponent, {
			width: '250px',
			data: item
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadNews()
		});
	}

	delete(id) {
		this.notify.xoaTin(id)
	}
}
