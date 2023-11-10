import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/Category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getCategoryById(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}`)
  }

  handlePayment(payload: {}) {
    const promisePostPyament = new Promise((resolve, reject) => {
      //save payment
      let idStatus = 0;
      setTimeout(() => {
        resolve(idStatus);
      }, 100)
    }) 

    function handleRecuisiveStatus(newPromise: any) {
      newPromise.then((value:any) => {
        const response = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`pending&${value}`)
          }, 400)
          
          setTimeout(() => {
            resolve(`pending&${value}`)
          }, 400)
        })
  
        response.then((val) => {
          if(val == "complete") { return; }
          handleRecuisiveStatus(newPromise);
        })
      })
    }

    handleRecuisiveStatus(promisePostPyament);
  }
}


