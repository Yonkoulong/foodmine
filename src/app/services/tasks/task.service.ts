import { Injectable } from '@angular/core';
import { Task } from '../../shared/models/Task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private tasks: Task[] = [
    { id: 1, title: 'Complete Angular project', category: {id: 0, name: "other"}, completed: false, endDate: new Date() },
    { id: 2, title: 'Learn TypeScript', category: {id: 0, name: "other"}, completed: true, endDate: new Date() },
  ];
  

  constructor(private http: HttpClient ) { }

  getTasks(categoryID: number): Observable<Task[]> {
    let slashCategory='';
    if(categoryID) {
      slashCategory = `category=${categoryID}`
    }
    return this.http.get<Task[]>(`${this.apiUrl}?${slashCategory}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editTask(taskEdit: Task): Observable<Task> { 
    return this.http.put<Task>(`${this.apiUrl}/${taskEdit.id}`, taskEdit);
  }
}
