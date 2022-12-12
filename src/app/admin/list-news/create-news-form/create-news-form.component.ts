import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MedicineService } from 'src/app/service/adminservice/medicine.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialogRef } from '@angular/material';
import { NewsService } from 'src/app/service/userservice/news.service';
import { CKEditor4 } from 'ckeditor4-angular';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
	selector: 'app-create-news-form',
	templateUrl: './create-news-form.component.html',
	styleUrls: ['./create-news-form.component.css']
})
export class CreateNewsFormComponent implements OnInit {
	myForm: FormGroup;
	data;
	constructor(private newService: NewsService,
		private notify: NotifyService, private fb: FormBuilder,
		private authenticate: AuthenticationService, 
		public dialogRef: MatDialogRef<CreateNewsFormComponent>,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			title: "",
			content: "",
			img: "google.com",
			author: "",
			date: new Date(),
			text: "",
			userID: this.authenticate.currentUserValue.id
		})
	}

	onSubmit() {
		try {
			this.newService.createNews(this.myForm.value).subscribe(data => {
				this.notify.notifySuccessNotLink("Tạo thành công", "")
			}, err => {
				this.notify.notifiError("Error", err)
			})

		} catch {

		}

	}

	onNoClick(): void {

		this.dialogRef.close();
	}

	public onChange(event: CKEditor4.EventInfo) {
		this.myForm.value.text = event.editor.getData();
	  }

	onFileSelected() {
		const inputNode: any = document.querySelector('#file');
		var imageURL =  URL.createObjectURL(inputNode.files[0]);
		var img = document.getElementById('previewImg')
		img.setAttribute('src', imageURL);
		// if (typeof (FileReader) !== 'undefined') {
		// 	const reader = new FileReader();

		// 	reader.onload = (e: any) => {
		// 		console.log(e.target.result);
		// 		var img = document.getElementById('previewImg')
		// 		var imageURL =  URL.createObjectURL(e.target.result);
		// 		img.setAttribute('src', imageURL);
		// 		img.setAttribute('display', "block");
		// 	};

		// 	reader.readAsArrayBuffer(inputNode.files[0]);
		// }
	}

}
