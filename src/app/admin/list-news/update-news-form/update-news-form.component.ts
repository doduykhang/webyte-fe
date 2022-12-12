import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewsService } from 'src/app/service/userservice/news.service';
import { NotifyService } from 'src/app/service/notify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
	selector: 'app-update-news-form',
	templateUrl: './update-news-form.component.html',
	styleUrls: ['./update-news-form.component.css']
})
export class UpdateNewsFormComponent implements OnInit {
	myForm: FormGroup;
	model = {
        editorData: ''
    };
	constructor(private newService: NewsService,
		private notify: NotifyService, private fb: FormBuilder,
		private authenticate: AuthenticationService, 
		public dialogRef: MatDialogRef<UpdateNewsFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
	}

	ngOnInit() {
		this.myForm = this.fb.group({
			...this.data,
			userID: this.authenticate.currentUserValue.id
		})
		this.model.editorData = this.myForm.value.text;
	}

	onSubmit() {
		try {
			this.newService.updateNews(this.myForm.value).subscribe(data => {
				this.notify.notifySuccessNotLink("Sửa thành công", "")
			}, err => {
				this.notify.notifiError("Error", err)
			})

		} catch {

		}
	}

	public onChange(event: CKEditor4.EventInfo) {
		this.myForm.value.text = event.editor.getData();
	  }


	onNoClick(): void {

		this.dialogRef.close();
	}
}
