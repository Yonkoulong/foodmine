import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../../../shared/models/Task';
import { Category } from '../../../../shared/models/Category';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})

export class TaskListComponent implements OnInit {
  taskValue: string = '';
  tasks: Task[] = [];
  taskEdit: any = null;
  idTaskIncrement: number = 3;
  currentCategoryId: number = 0; 
  isOpenCreateCategoryPopup: boolean = false;
  
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.handleFetchTasks()
  }

  handleChangeTaskValue(value: string) {  
    if(this.taskEdit) {
      this.taskService.editTask({...this.taskEdit, title: value })
      .subscribe({
        next: () => {
          this.handleFetchTasks();
          this.taskEdit = null;
        },
        error: (error) => console.log(`Error: ${error}`),
        complete: () => console.info('complete')
      });
    } else {
      this.taskService.addTask({ id: this.idTaskIncrement++, 
        title: value, category: '', completed: false }).subscribe({
          next: () => this.handleFetchTasks(),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      
    }
  }

  handleDeleteTask(id: number) {    
    this.taskService.deleteTask(id).subscribe({
      next: () => this.handleFetchTasks(),
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('complete')
    });
  }

  handleEditTask(task: Task) {    
    this.taskEdit = task;
  }

  handleUpdateStatusTask(task: Task) {
    if(!task) { return; }
    this.taskService.editTask(task).subscribe({
      next: () => this.handleFetchTasks(),
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('complete')
    });
  }

  handleFilterTaskByCategory(category: Category) {
    this.currentCategoryId = category.id;

    this.taskService.getTasks(this.currentCategoryId).subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('complete')
    })
  }

  handleFetchTasks() {
    this.taskService.getTasks(this.currentCategoryId).subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('complete')
    })
  }
  
  handleIsOpenCreateCategoryPopup() {

  }

  handleClosePopup(value: boolean) {

  }

  
}
