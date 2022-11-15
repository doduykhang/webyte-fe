import {Component, HostListener, OnInit, DoCheck} from '@angular/core';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {HeaderserviceService} from 'src/app/service/userservice/headerservice.service';
import {AuthenticationService} from '../../service/authentication.service';
import {NotifyService} from '../../service/notify.service';
import {UserserviceService} from '../../service/userservice.service';
import {DoctorService} from '../../service/doctorservice/doctor.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class UserHeaderComponent implements OnInit, DoCheck {


  constructor(private route: Router, private headerService: HeaderserviceService,
              private authentication: AuthenticationService, private notify: NotifyService,
              private userService: UserserviceService, private doctorService: DoctorService) {
    this.class = '';
    this.navbar_mobile = '';
    this.scrolled = window.pageYOffset > 48;
  }

  class;
  // tslint:disable-next-line:variable-name
  navbar_mobile;
  // tslint:disable-next-line:variable-name
  class_bix = false;
  size;
  isDesktop: boolean;
  home;
  header;
  existUser = false;

  private mediaService = new MediaService('(min-width: 991px)');

  scrolled = false;

  ngOnInit() {

    this.home = this.headerService.getThisHome();
    if (this.home !== true) {
      this.class = 'header-scrolled';
    }
    this.existUser = this.authentication.existUser();

    this.mediaService.match$.subscribe(value => {
        this.isDesktop = value;
        console.log('hihi' + this.isDesktop);
      }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 48;
    // tslint:disable-next-line:triple-equals
    if (this.home == true) {
      // tslint:disable-next-line:triple-equals
      if (this.scrolled == true) {
        this.class = 'header-scrolled';
      } else {
        this.class = '';
      }
    }
  }

  click() {

    // tslint:disable-next-line:triple-equals
    if (this.class_bix == true) {
      this.navbar_mobile = '';
    } else {
      // tslint:disable-next-line:triple-equals
      if (this.isDesktop == true) {
        this.navbar_mobile = '';
      } else {
        this.navbar_mobile = 'navbar-mobile';
      }
    }


    this.class_bix = !this.class_bix;
  }

  // about() {
  //   this.home = false;
  //   this.class = 'header-scrolled';
  //   this.route.navigate(['about']);
  // }

  headerClick(name) {
    // tslint:disable-next-line:triple-equals
    if (name != 'home') {
      this.home = false;
      this.headerService.setThisHome(false);
      this.class = 'header-scrolled';
      // tslint:disable-next-line:triple-equals
      if (name == 'logout') {
        this.notify.notifyCancel('Đã đăng xuất!!!');
        this.authentication.logout();
        this.userService.logout();
        this.doctorService.logout();
        this.existUser = false;
      }
    }
  }

  ngDoCheck() {
    this.header = this.headerService.getHeader();
    this.home = this.headerService.getThisHome();
    if (this.existUser) {
      this.header = this.headerService.getHeaderAfterLogin();
    } else {
      this.header = this.headerService.getHeaderDefault();
    }
  }


}

class MediaService {
  private matches = new ReplaySubject<boolean>(1);
  public match$ = this.matches.asObservable();

  constructor(public readonly query: string) {
    // we need to make sure we are in browser
    if (window) {
      const mediaQueryList = window.matchMedia(this.query);
      // here we pass value to our ReplaySubject
      const listener = event => this.matches.next(event.matches);
      // run once and then add listener
      listener(mediaQueryList);
      mediaQueryList.addEventListener('change', listener);
    }
  }
}
