import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { HeaderDoctorComponent } from './header-doctor/header-doctor.component';
import { UserHeaderComponent } from './header/header.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    UserHeaderComponent,
    HeaderDoctorComponent,
     HeaderAdminComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    MatSidenavModule
  ],
  exports: [
    UserHeaderComponent,
    HeaderDoctorComponent,
    HeaderAdminComponent,
  ]

})
export class ShareModule { }
