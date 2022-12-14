import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/adminservice/news.service';
import { NewsService as UserNewsSerivce } from '../../service/userservice/news.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialog } from '@angular/material';
import { FormControl, FormBuilder } from '@angular/forms';
import { CreateNewsFormComponent } from './create-news-form/create-news-form.component';
import { UpdateNewsFormComponent } from './update-news-form/update-news-form.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-list-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
	listNews;
	searchForm = this.formBuilder.group({
		query: '',
	});
	p: number;
	constructor(private newsService: NewsService,
		private userNewsService: UserNewsSerivce,
		public dialog: MatDialog,
		public notify: NotifyService,
		private formBuilder: FormBuilder,
		private storage: AngularFireStorage
	) { }

	ngOnInit() {
		this.loadNews()
	}

	loadNews(name: string = "", page: number = 0, size: number = 1000) {

		this.newsService.getListNews().subscribe(data => {
			if (data) {
				this.listNews = data;
			}
		});
	}

	create() {
		const dialogRef = this.dialog.open(CreateNewsFormComponent, {
			width: '750px',
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadNews()
		});
	}

	update(item) {

		const dialogRef = this.dialog.open(UpdateNewsFormComponent, {
			width: '750px',
			data: item
		});

		dialogRef.afterClosed().subscribe(result => {

			this.loadNews()
		});
	}

	delete(id) {
		this.notify.xoaTin(id)
	}

	onSearch() {
		this.loadNews(this.searchForm.value.query, 0, 1000)
	}
onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadURL = fileRef.getDownloadURL();
          downloadURL.subscribe(url => {
            console.log(url);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
