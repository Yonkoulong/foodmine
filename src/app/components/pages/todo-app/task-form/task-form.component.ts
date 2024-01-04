import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Input() placeholder: string = 'Enter task value';
  @Input() isMandatory: boolean = false;
  @Input() taskEdit: any = null;
  @Output() handleTaskChange = new EventEmitter<string>();

  task: string = '';
  taskStatus: string = '';

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if(this.taskEdit) {
      this.task = this.taskEdit.title;
    }
  }

  handleTaskInput() {
    if(!this.task || !this.task.trim()) { 
      this.taskStatus = 'error';
    } else {
      this.taskStatus = '';
      this.handleTaskChange.emit(this.task);
      this.task = '';
    }
  }
}
