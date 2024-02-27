import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { User } from 'src/app/shared/models/User';


const mappingKeys: any = {
  username: 'Tên đăng nhâp',
  password: 'Mật khẩu',
};
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signinForm: any;
  success = false;
  signInFailed: any = {};
  isCompInit = false;
  isLoading = false;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async handleSignin() {    
    if (this.signinForm.status != 'INVALID') {
      this.isLoading = true;
      
      this.authService.signIn(this.signinForm.value).subscribe({
        next: (user: User) => {
          this.isLoading = false;
          this.router.navigate(['/'])
          this.snackbar.openSnackBar("Login Success!", "success")
          localStorage.setItem('USER', JSON.stringify(user));
        },
        error: (error) => {
          this.isLoading = false;
          this.snackbar.openSnackBar("Login fail!", "fail")
        },
      });
    } else {
      this.signinForm.markAllAsTouched();
    }
  }

  get formState(): any {
    return this.signinForm.controls;
  }
}
