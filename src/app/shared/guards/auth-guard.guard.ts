import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private authentication: AuthenticationService
	) { }
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return true
		const currentUser = this.authentication.currentUserValue;
		if (currentUser) {
			// check if route is restricted by role
			if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
				// role not authorised so redirect to home page
				this.router.navigate(['/user/home']);
				return false;
			}
			// authorised so return true
			return true;
		}
		// not logged in so redirect to login page with the return url
		this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
