import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../shared/models/Task';
import { TaskService } from '../../../../services/task.service';

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

  constructor() {}

  deleteTask(id: number) {    
    this.handleDeleteTask.emit(id);
  } 

  editTask(task: Task) {
    this.handleEditTask.emit(task);
  }

  updateStatusTask(task: Task) {
    this.handleUpdateStatusTask.emit({...task, completed: !task.completed })
  }
}
