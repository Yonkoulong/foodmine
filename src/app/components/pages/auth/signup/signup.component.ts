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
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as bcrypt from 'bcryptjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AuthService  } from 'src/app/services/auth/auth.service';
import { UserService  } from 'src/app/services/users/user.service';
import { User } from 'src/app/shared/models/User';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})
export class SignupComponent {
  signupForm: any;
  success = false;
  hide = true;
  signUpFailed: any = {
    username: '',
    password: ''
  };
  isLoading = false;
  users: User[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private userService: UserService, private _snackBar: SnackbarService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      id: [uuidv4()],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['customer']
    });

    this.handleFetchUser()
  }

  handleSignup() {
    this.isLoading = true;
    const pass = bcrypt.hashSync(this.signupForm.value?.password, 10); // App is not compliling when I add this line //
    
    if(this.signupForm.status != 'INVALID') {
      const checkDuplicateUsername = this.users.some((user) => user.username === this.signupForm.value.username );
      
      if(!checkDuplicateUsername) {
        this.userService.postUser({...this.signupForm.value, password: pass}).subscribe({
          next: (response) => { 
            this.success = true; 
            this.signUpFailed = {
              username: '',
              password: ''
            };
            this.signupForm.reset({
              username: [''],
              password: ['']
            });
            this._snackBar.openSnackBar("Register account success!", "success")
            this.router.navigate(['login']);
          },
          error: (error) => this._snackBar.openSnackBar("Register account fail!", "error"),
          complete: () => console.info('Sign up success')
        })
      } else {
        this._snackBar.openSnackBar("Register account fail!", "error")
        this.signUpFailed['username'] = "Duplicate username";        
      }
    } else {      
      for(let field in this.signUpFailed) {  
        if(this.signupForm.controls[`${field}`].errors) {
          this.signUpFailed[`${field}`] = "Please enter field!"
        } else {
          this.signUpFailed[`${field}`] = ""
        }
      }
    }
    this.isLoading = false;
  }

  handleFetchUser() {
    this.userService.getUsers().subscribe({
      next: (users) => { this.users = users },
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('Get users success')
    })
  }
}
