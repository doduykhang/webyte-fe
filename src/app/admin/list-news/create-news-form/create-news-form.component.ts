import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MedicineService } from 'src/app/service/adminservice/medicine.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialogRef } from '@angular/material';
import { NewsService } from 'src/app/service/userservice/news.service';
import { CKEditor4 } from 'ckeditor4-angular';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
	selector: 'app-create-news-form',
	templateUrl: './create-news-form.component.html',
	styleUrls: ['./create-news-form.component.css']
})
export class CreateNewsFormComponent implements OnInit {
	myForm: FormGroup;
	data;
	url: string;
	constructor(private newService: NewsService,
		private notify: NotifyService, private fb: FormBuilder,
		private authenticate: AuthenticationService, 
		public dialogRef: MatDialogRef<CreateNewsFormComponent>,
		private storage: AngularFireStorage
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
			console.log(this.url)
			this.newService.createNews({
				...this.myForm.value,
				img: this.url
			}).subscribe(data => {
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

	async onFileSelected(event) {
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
		//
		//
	//upload image to firebase
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `${n}`;
    const fileRef = this.storage.ref(filePath);
    await this.storage.upload(`${n}`, file);
    const url = await fileRef.getDownloadURL().toPromise();
    this.url = url

}
}
