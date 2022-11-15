import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {DeptService} from './adminservice/dept.service';
import {DoctorServiceService} from './adminservice/doctor-service.service';
import { MedicineService } from './adminservice/medicine.service';
import {PatientServiceService} from './adminservice/patient-service.service';
import { SickService } from './adminservice/sick.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private route: Router, private deptSV: DeptService,
              private doctorSV: DoctorServiceService, private patientSV: PatientServiceService,
              private medicineSV: MedicineService, private sickSV: SickService
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
        title: 'Cảnh báo',
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
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khoa này khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deptSV.deleteDeptByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Khoa đang tồn tại bác sĩ, Không thể xóa!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }

  xoaBacSi(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.doctorSV.deleteDoctorByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Không thể xóa bác sĩ đang có nhiệm vụ!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }

  xoaThuoc(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicineSV.deleteByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Xóa không thành công!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }
  xoaBenh(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sickSV.delete(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Xóa không thành công!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }
  xoaLichKham(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deptSV.deleteDeptByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Xóa không thành công!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }
  xoaBenhNhan(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientSV.deletePatientByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Bệnh nhân đã đăng ký dịch vụ không thể xóa!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }
  xoaBaiViet(id: number) {
    Swal.fire({
      title: 'Bạn đã chắc chắn?',
      text: 'Bạn sẽ xóa khỏi danh sách khoa!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý xóa!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deptSV.deleteDeptByID(id).subscribe(data => {
          if (data === 1) {
            this.notifyCancel('Xóa thành công!');
            this.reloadPage();
          } else {
            this.notifyCancel('Xóa không thành công!');
          }
        }, error => {
          this.notifyCancel('Xóa không thành công!');
        });
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }
}
