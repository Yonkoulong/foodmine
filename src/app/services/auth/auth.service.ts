import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/User'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  private apiUsers = 'http://localhost:3000/users';
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<User> {    
    return this.http.get<User>(this.apiUsers);
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