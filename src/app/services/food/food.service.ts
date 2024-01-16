import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  basepath = 'http://localhost:3000/food';
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(this.basepath);
  }
}
