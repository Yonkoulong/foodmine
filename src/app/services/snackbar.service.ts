import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

type positionSnackbar = {
  horizontal: MatSnackBarHorizontalPosition;
  vertical: MatSnackBarVerticalPosition;
}

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {
 
  
  constructor(private _snackBar: MatSnackBar) { }

   openSnackBar(message: string, action: string, position?: positionSnackbar, duration?: number) {
    this._snackBar.open(message, action, {
      horizontalPosition: position?.horizontal || 'end',
      verticalPosition: position?.vertical || 'top',
      duration: duration || 1000
    });
  }
}
