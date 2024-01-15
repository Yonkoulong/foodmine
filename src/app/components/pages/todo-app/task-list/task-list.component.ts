import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../shared/models/Task';
import { Category } from '../../../../shared/models/Category';
import { switchMap } from 'rxjs/operators';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AddTaskComponent } from '../dialog/add-task/add-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})

export class TaskListComponent implements OnInit {
  taskValue: string = '';
  tasks: Task[] = [];
  taskEdit: Task | any = null;
  isOpenCreateCategoryPopup: boolean = false;
  currentCategoryId: number = 0;
  taskRemaining: Task[] = [];

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.handleFetchTasks(this.currentCategoryId || 0)
  }

  handleDeleteTask(id: number) {    
    this.taskService.deleteTask(id).subscribe({
      next: () => this.handleFetchTasks(this.currentCategoryId || 0),
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    });
  }

  handleEditTask(task: Task) {    
    this.taskEdit = task;
    this.handleFetchTasks(this.currentCategoryId || 0);
  }

  handleUpdateStatusTask(task: Task) {
    if(!task) { return; }
    this.taskService.editTask(task).subscribe({
      next: () => this.handleFetchTasks(this.currentCategoryId || 0),
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    });
  }

  handleFilterTaskByCategory(category: Category) {
    this.currentCategoryId = category?.id;
    this.handleFetchTasks(category?.id);
  }

  handleFetchTasks(categoryId: number) {
    this.taskService.getTasks(categoryId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;        
        this.taskRemaining = tasks.filter((task) => !task.completed);        
      },
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    })
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: null});

    dialogRef.afterClosed().subscribe(result => {
      if(result) {  
        this.handleFetchTasks(this.currentCategoryId || 0)
      }
    });
  }
}
