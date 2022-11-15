import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/service/authentication.service';
import {NotifyService} from 'src/app/service/notify.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  formheader: FormGroup;

  constructor(private router: Router, private notify: NotifyService, private authentication: AuthenticationService) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout() {
    this.notify.notifyCancel('Đăng xuất thành công!!!');
    this.authentication.logout();
  }

}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/admin/home', title: 'Trang chủ', icon: 'fa fa-home ', class: ''},
  {path: '/admin/list-appointment', title: 'Danh sách lịch khám', icon: 'fa fa-calendar-plus-o text-blue', class: ''},
  {path: '/admin/department', title: 'Danh sách Khoa', icon: 'fa fa-list-alt text-orange', class: ''},
  {path: '/admin/list-doctor', title: 'Danh sách bác sĩ ', icon: 'fa fa-calendar text-yellow', class: ''},
  {path: '/admin/list-patient', title: 'Danh sách bệnh nhân ', icon: 'fa fa-user-plus text-yellow', class: ''},
  {path: '/admin/list-medicine', title: 'Danh sách thuốc', icon: 'fa fa-medkit text-red', class: ''},
  {path: '/admin/list-sick', title: 'Danh sách bệnh', icon: 'fa fa-plus-square text-red', class: ''},
  {path: '/admin/list-news', title: 'Danh sách bài viết', icon: 'fa fa-newspaper-o text-red', class: ''},
  {path: '/tables', title: 'Danh sách lịch trực', icon: 'fa fa-calendar-o text-red', class: ''},
  {path: '/admin/my-account', title: 'Thông tin cá nhân', icon: 'fa fa-user text-red', class: ''},

];
