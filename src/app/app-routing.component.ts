import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {DoctorComponent} from './doctor/doctor.component';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './layout/login/login.component';
import {RegisterComponent} from './layout/register/register.component';
import {UserComponent} from './user/user.component';
import {AuthGuard} from './shared/guards/auth-guard.guard';
import {AuthorityRoleConstant} from './constant/authority/authority-role-constant';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/home',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'user',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layout/layout.module').then(m => m.LayoutModule)
      }
    ]
  },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard],
    data: { roles: [AuthorityRoleConstant.ROLE_DOCTOR] },
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/doctor/doctor.module').then(m => m.DoctorModule)
      },

    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [AuthorityRoleConstant.ROLE_ADMIN] },
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule)
      },

    ]
  },
  {
    path: '**',
    redirectTo: 'user/home'
  },

  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [

    RouterModule
  ],
})
export class AppRoutingModule {
}
