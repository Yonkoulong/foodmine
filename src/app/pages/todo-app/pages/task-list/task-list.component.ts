import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../services/tasks/task.service';
import { Task } from '../../../../shared/models/Task';
import { Category } from '../../../../shared/models/Category';
import { switchMap, debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AddTaskComponent } from '../../components/dialog/add-task/add-task.component';
import { ConfirmComponent } from 'src/app/shared/components/dialog/confirm/confirm.component';
import { TYPE_OF_DIALOG } from '../../constants/todo-app.constant';

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
  inputText: string = '';
  isLoading: boolean = false;
  private searchTask = new Subject<string>();
  private readonly debounceTimeMs = 300;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.handleFetchTasks(this.currentCategoryId || 0);

    this.searchTask.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {        
      this.performSearch(searchValue);
    })
  }

  ngOnDestroy(): void {
    console.log("onDestroy");
    this.searchTask.complete();
  }

  handleDeleteTask(id: string) {        
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

  onSearch() {    
    this.isLoading = true;
    this.searchTask.next(this.inputText);
  }

  performSearch(value: string) {    
    if(value) {
      const listTaskSearched = this.tasks.filter((task) => task.title.includes(value))
      this.tasks = listTaskSearched;
    } else {
      this.handleFetchTasks(this.currentCategoryId || 0);
    }

    this.isLoading = false
  }
  
  openDialogCreateTask(): void {
    this.open(AddTaskComponent, {}, TYPE_OF_DIALOG.CREATE);
  }

  openDialogConfirm(id: string) {
    this.open(ConfirmComponent, {
      title: 'Warning',
      icon: '',
      description: 'Are you sure to delete this task',
      taskId: id
    }, TYPE_OF_DIALOG.DELETE)
  }

  open(com: any, data: any, purpose: string) {
    const dialogRef = this.dialog.open(com, { data });

    dialogRef?.afterClosed().subscribe(result => {
      if(result) {  
        switch(purpose) {
          case TYPE_OF_DIALOG.CREATE: this.handleFetchTasks(this.currentCategoryId || 0);
          break;
          case TYPE_OF_DIALOG.DELETE: this.handleDeleteTask(data?.taskId);
          break;
        }
      }
    });
  }
}
