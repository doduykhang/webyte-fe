import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeptService } from './adminservice/dept.service';
import { DoctorServiceService } from './adminservice/doctor-service.service';
import { MedicineService } from './adminservice/medicine.service';
import { PatientServiceService } from './adminservice/patient-service.service';
import { SickService } from './adminservice/sick.service';
import { NewsService } from './userservice/news.service';

@Injectable({
	providedIn: 'root'
})
export class NotifyService {

	constructor(private route: Router, private deptSV: DeptService,
		private doctorSV: DoctorServiceService, private patientSV: PatientServiceService,
		private medicineSV: MedicineService, private sickSV: SickService,
		private newsService: NewsService
	) {
	}

	blockPermission() {
		const success = Swal.mixin({
			toast: true,
			position: 'bottom-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});
		success.fire({
			title: 'Not have access!!!',
			icon: 'error',
		}
		);
	}

	notifySuccessToggerMessage(titel) {
		const success = Swal.mixin(
			{
				toast: true,
				position: 'bottom-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				didOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer);
					toast.addEventListener('mouseleave', Swal.resumeTimer);
				}
			}
		);
		success.fire({
			title: titel,
			icon: 'success',
			// background:'#CCF8D7',
		}
		);
	}

	public notifySuccess(title, linkRouter, text) {
		Swal.fire({
			icon: 'success',
			title,
			text,
			timer: 3500,
		}).then((result) => {
			if (result.isConfirmed) {
				this.route.navigate([linkRouter]);
			}
		});
	}

	notifySuccessNotLink(title, text) {
		Swal.fire({
			title,
			html: text,
			icon: 'success',
			iconColor: '#0dd4b9',
		});
	}

	notifyNotLink(title, text, icon) {
		Swal.fire({
			title,
			html: text,
			icon,
			iconColor: '#0dd4b9',
		});
	}

	notifyErrorToggerMessage(titel) {
		const error = Swal.mixin({
			toast: true,
			position: 'bottom-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer);
				toast.addEventListener('mouseleave', Swal.resumeTimer);
			}
		});
		error.fire({
			title: titel,
			icon: 'error',
		});
	}

	notifyCancel(text) {
		Swal.fire({
			icon: 'warning',
			title: 'C???nh b??o',
			text,
		}
		);
	}

	notifiError(title, text) {
		Swal.fire({
			icon: 'error',
			title,
			text
		});
	}

	confirmSuccess(title, text, confirmButtonText, title1, text1): any {
		function returnStatus(status) {
			return status;
		}

		Swal.fire({
			title,
			text,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText,
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					title1,
					text1,
					'success'
				);
				this.route.navigate(['doctor/video-call']);
			}
		});
	}

	xoaKhoa(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a khoa n??y kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.deptSV.deleteDeptByID(id).subscribe(data => {
					if (data.message === "Ok") {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('Khoa ??ang t???n t???i b??c s??, Kh??ng th??? x??a!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}

	xoaTin(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a tin n??y kh???i danh s??ch tin t???c!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.newsService.deleteNews(id).subscribe(data => {
					if (data.message === "ok") {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('X??a th???t b???i, th??? l???i sau!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}

	xoaBacSi(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.doctorSV.deleteDoctorByID(id).subscribe(data => {
					if (data.message === "ok") {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('Kh??ng th??? x??a b??c s?? ??ang c?? nhi???m v???!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}

	xoaThuoc(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.medicineSV.deleteByID(id).subscribe(data => {
					if (data.message === "ok") {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('X??a kh??ng th??nh c??ng!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}
	xoaBenh(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.sickSV.delete(id).subscribe(data => {
					if (data.message === "ok") {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('X??a kh??ng th??nh c??ng!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}
	xoaLichKham(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.deptSV.deleteDeptByID(id).subscribe(data => {
					if (data === 1) {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('X??a kh??ng th??nh c??ng!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}
	xoaBenhNhan(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.patientSV.deletePatientByID(id).subscribe(data => {
					if (data === 1) {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('B???nh nh??n ???? ????ng k?? d???ch v??? kh??ng th??? x??a!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}
	xoaBaiViet(id: number) {
		Swal.fire({
			title: 'B???n ???? ch???c ch???n?',
			text: 'B???n s??? x??a kh???i danh s??ch khoa!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: '?????ng ?? x??a!',
		}).then((result) => {
			if (result.isConfirmed) {
				this.deptSV.deleteDeptByID(id).subscribe(data => {
					if (data === 1) {
						this.notifyCancel('X??a th??nh c??ng!');
						this.reloadPage();
					} else {
						this.notifyCancel('X??a kh??ng th??nh c??ng!');
					}
				}, error => {
					this.notifyCancel('X??a kh??ng th??nh c??ng!');
				});
			}
		});
	}

	reloadPage() {
		window.location.reload();
	}
}
