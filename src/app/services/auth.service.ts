import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUsers = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  signIn(user: User): Observable<User> {    
    return this.http.get<User>(this.apiUsers);
  }

}
