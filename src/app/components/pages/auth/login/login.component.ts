import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import * as bcrypt from 'bcryptjs';
import { AuthService  } from 'src/app/services/auth.service';
import { UserService  } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { v4 as uuidv4 } from 'uuid';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

const mappingKeys : any = {
  username : "Tên đăng nhâp",
  password : "Mật khẩu"
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  signinForm: any;
  success = false;
  signInFailed: any = {};
  users: User[] = [];

  horizonTalSnackbar: MatSnackBarHorizontalPosition = 'end';
  verticalSnackbar: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.handleFetchUser();
  }

  handleSignin() {
    
    if(this.signinForm.status != 'INVALID') { 
      console.log("ss");
      
    } else {
      for(let key in this.signinForm.controls) {
        if(!this.signinForm.controls[key]?.errors?.require) {
          this.signInFailed[key] = mappingKeys?.[key];
        }
      }
      console.log(this.f.username);
      
    }
  }

  get f(){
    return this.signinForm.controls;
  }

  handleFetchUser() {
    this.userService.getUsers().subscribe({
      next: (users) => { this.users = users },
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('Get users success')
    })
  }
}
