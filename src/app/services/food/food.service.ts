import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpOptions } from '../heroes/heroes.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:30000/food';
  constructor(private http: HttpClient) { }
  
  getFoods(type?: number): Observable<Food[]> {
    let slashType='';
    if(type) {
      slashType = `type=${type}`
    }
    return this.http.get<Food[]>(`${this.apiUrl}${slashType && "?" + slashType}`);
  }

  addFood(food: Food): Observable<Food> {    
    return this.http.post<Food>(this.apiUrl, food);
  }

  deleteFood(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editFood(foodEdit: Food): Observable<Food> { 
    return this.http.put<Food>(`${this.apiUrl}/${foodEdit._id}`, foodEdit);
  }
  
  getFoodById(id: string): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`)
  }

}
