import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewsService } from 'src/app/service/userservice/news.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-update-news-form',
	templateUrl: './update-news-form.component.html',
	styleUrls: ['./update-news-form.component.css']
})
export class UpdateNewsFormComponent implements OnInit {
	myForm: FormGroup;

	constructor(private newService: NewsService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<UpdateNewsFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			...this.data,
			userID: 1
		})
	}

	onSubmit() {
		try {
			this.newService.updateNews(this.myForm.value).subscribe(data => {
				this.notify.notifySuccessNotLink("Created", "Created")
			}, err => {
				this.notify.notifiError("Error", err)
			})

		} catch {

		}

	}

	onNoClick(): void {

		this.dialogRef.close();
	}
}
