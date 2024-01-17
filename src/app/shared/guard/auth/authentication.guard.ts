import { Injectable, ɵɵinject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChildFn, CanActivateFn, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

// let authService: AuthService;
// let router: Router;

export const AuthenticationGuard : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    const authService = ɵɵinject(AuthService);
    const router = ɵɵinject(Router)
    const snackbar = ɵɵinject(SnackbarService);
    let isLoggedIn = authService.isAuthenticated();

    if(isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      snackbar.openSnackBar("You need to login first!", "Fail")
      return false;
    }
}
