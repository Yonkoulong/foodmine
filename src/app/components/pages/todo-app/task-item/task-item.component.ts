import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/Task';
import { TaskService } from '../../../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../dialog/add-task/add-task.component';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() taskList: Task[] = [];
  @Output() handleDeleteTask = new EventEmitter<number>();
  @Output() handleEditTask = new EventEmitter<Task>();
  @Output() handleUpdateStatusTask = new EventEmitter<Task>();

  isExpiryDate: boolean = false;

  constructor(public dialog: MatDialog ) {}

  deleteTask(id: number) {    
    this.handleDeleteTask.emit(id);
  } 

  editTask(task: Task) {
    this.handleEditTask.emit(task);
  }

  updateStatusTask(task: Task) {
    this.handleUpdateStatusTask.emit({...task, completed: !task.completed })
  }

  handleCalculateDateRemaining(deadline: Date) {
    const currentDate = Date.now();
    const dateRemaining =  new Date(deadline).getTime() - currentDate;

    let dateResult = Math.round(dateRemaining / (1000 * 3600 * 24));
    
    if(dateResult < 0) {
      this.isExpiryDate = true;
    }
    
    return dateResult;
  }

  openDialog(task: Task): void {
    
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data: task});

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.handleFetchTasks()
    //   }
    // });
  }
}
