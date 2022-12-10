import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MedicineService } from 'src/app/service/adminservice/medicine.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialogRef } from '@angular/material';
import { NewsService } from 'src/app/service/userservice/news.service';

@Component({
	selector: 'app-create-news-form',
	templateUrl: './create-news-form.component.html',
	styleUrls: ['./create-news-form.component.css']
})
export class CreateNewsFormComponent implements OnInit {
	myForm: FormGroup;

	constructor(private newService: NewsService,
		private notify: NotifyService, private fb: FormBuilder,
		public dialogRef: MatDialogRef<CreateNewsFormComponent>,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			title: "",
			content: "",
			img: "",
			author: "",
			date: "",
			text: "",
			userID: 1
		})
	}

	onSubmit() {
		try {
			this.newService.createNews(this.myForm.value).subscribe(data => {
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
