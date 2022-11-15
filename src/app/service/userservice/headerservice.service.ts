import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderserviceService {
  header = [
    {title: 'Trang chủ', active: 'active', name: 'home', disable: false},
    {title: 'Giới thiệu', active: '', name: 'about', disable: false},
    {title: 'Danh mục bác sĩ', active: '', name: 'list-doctor', disable: false},
    {title: 'Lịch khám', active: '', name: 'appointment-schedule', disable: true},
    {title: 'Liên hệ', active: '', name: 'contact', disable: false},
    {title: 'Hỏi đáp với bác sĩ', active: '', name: 'ask-answer', disable: false},
    {title: 'Thông tin cá nhân', active: '', name: 'my-account', disable: true},
    {title: 'Đăng nhập', active: '', name: 'login', disable: false},
    {title: 'Đăng xuất', active: '', name: 'logout', disable: true}
  ];
  headerDefault = [];
  headerAfterLogin = [];
  thisHome ;

  constructor() {
  }

  getHeader() {
    return this.header;
  }

  getHeaderAfterLogin() {
    this.headerAfterLogin = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.header.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.header[i].name != 'login') {
        this.headerAfterLogin.push(this.header[i]);
      }
    }
    return this.headerAfterLogin;
  }

  getHeaderDefault() {
    this.headerDefault = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.header.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.header[i].disable == false) {
        this.headerDefault.push(this.header[i]);
      }
    }
    return this.headerDefault;
  }

  setActive(name) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.header.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.header[i].name == name) {
        this.header[i].active = 'active';
      } else {
        this.header[i].active = '';
      }
    }
  }

  classActive() {

  }

  getThisHome() {
    return this.thisHome;
  }

  setThisHome(flag) {
    this.thisHome = flag;
  }
}
