import { Injectable, inject, ɵɵinject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
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
      if(state.url == '/sign-in') {
        router.navigate(['']);
        return false;
      }
      return true;
    } else {
      if(state.url == '/sign-in') {
        return true        
      }
      router.navigate(['sign-in']);
      snackbar.openSnackBar("You need to login first!", "Fail")
      return false;
    }

}
