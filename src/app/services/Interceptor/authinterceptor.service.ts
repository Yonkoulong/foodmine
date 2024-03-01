import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbar: SnackbarService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('USER') as string);

    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    
    return next.handle(request).pipe(
      catchError((error, caught) => {
        if (error.status === 401) {
          this.handleInvalidToken("Token expired, please login again!");
        }
        return throwError(() => error);
      })
    );
  }

  private handleInvalidToken(message: string) : void { 
    localStorage.removeItem('USER');
    this.router.navigate(['/sign-in']);
    this.snackbar.openSnackBar(message, "Fail")
  }
}
