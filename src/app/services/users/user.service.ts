import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  basepath = 'http://localhost:30000/user';

  postUser(user: User): Observable<User> {    
    return this.http.post<User>(`${this.basepath}/sign-up`, user);
  }

  getUserProfile():Observable<User> {
    return this.http.get<User>(`${this.basepath}/profile`);
  }

 
}
