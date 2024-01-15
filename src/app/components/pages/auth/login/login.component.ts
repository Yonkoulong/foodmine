import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { User } from 'src/app/shared/models/User';
import { v4 as uuidv4 } from 'uuid';


const mappingKeys: any = {
  username: 'Tên đăng nhâp',
  password: 'Mật khẩu',
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signinForm: any;
  success = false;
  signInFailed: any = {};
  users: User[] = [];
  isCompInit = false;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.handleFetchUser();
  }

  handleSignin() {    
    if (this.signinForm.status != 'INVALID') {
      if (this.users.length == 0) return;
      
      let userCompare: User | any = this.users.find((user) => user.username === this.formState.username.value);
    
      if ( bcrypt.compareSync(this.signinForm.value.password, userCompare.password) ) {
        this.router.navigate(['/'])
        this.snackbar.openSnackBar("Login Success!", "success")
        localStorage.setItem('USER', JSON.stringify(userCompare));
      } else {
        this.snackbar.openSnackBar("Login fail!", "fail")
      }
    } else {
      this.signinForm.markAllAsTouched();
      // for(let key in this.signinForm.controls) {
      //   if(!this.signinForm.controls[key]?.errors?.require) {
      //     this.signInFailed[key] = mappingKeys?.[key];
      //   }
      // }
    }
  }

  get formState(): any {
    return this.signinForm.controls;
  }

  handleFetchUser() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('Get users success'),
    });
  }
}
