import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';
import { User } from 'src/app/shared/models/User';
import { v4 as uuidv4 } from 'uuid';
import { createConfirmPasswordValidator } from '../../validators/auth.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm: any;
  success = false;
  hidePassword = true;
  hideRePassword = true;

  isLoading = false;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private _snackBar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      id: [uuidv4()],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, createConfirmPasswordValidator()]],
      role: ['customer'],
    });

  }


  handleSignup() {
    const pass = bcrypt.hashSync(this.signupForm.value?.password, 10); // App is not compliling when I add this line //
    
    if (this.signupForm.status != 'INVALID') {
      this.isLoading = true;

      const checkDuplicateUsername = this.users.some(
        (user) => user.username === this.signupForm.value.username
      );
      
      this.isLoading = false;
      
      if (!checkDuplicateUsername) {
        this.userService
          .postUser({ ...this.signupForm.value, password: pass })
          .subscribe({
            next: (response) => {
              this.success = true;

              this.signupForm.reset({
                username: [''],
                password: [''],
                confirmPassword: ['']
              });
              this._snackBar.openSnackBar(
                'Register account success!',
                'success'
              );

              if(!this.isLoading) {
                this.router.navigate(['sign-in']);
              }
            },
            error: (error) =>
              this._snackBar.openSnackBar('Register account fail!', 'error'),
            complete: () => {}
            ,
          });
      } else {
        this._snackBar.openSnackBar('Duplicate username!', 'error');
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get formState() {
    return this.signupForm.controls;
  }
}
