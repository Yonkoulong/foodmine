import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/User'

type responseSignIn = {
  data: {
    token: string;
    userInfo: User;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private apiUsers = 'http://localhost:30000/user';
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<responseSignIn> {    
    return this.http.post<responseSignIn>(`${this.apiUsers}/sign-in`, user);
  }

  isAuthenticated() {
    const userInfo = localStorage.getItem('USER') || "{}";
    
    if(userInfo != "{}") {
      this.isLoggedIn = true;
      return this.isLoggedIn
    } else {
      this.isLoggedIn = false;
      return this.isLoggedIn;
    }
  }
}
