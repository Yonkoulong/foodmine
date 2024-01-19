import {Component, ElementRef, EventEmitter, HostListener, Inject, Output, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Task, SubTask } from 'src/app/shared/models/Task';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { createDatePickerValidator } from '../../../../../shared/utilities/app.util';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/shared/models/Category';
import { TaskService } from 'src/app/services/tasks/task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})

export class AddTaskComponent {
  @ViewChild('editSubTaskIpt') editSubTaskIptRef: ElementRef | undefined;
  taskForm: Task | any;
  subTasks: SubTask[] = [];
  subTaskText: string = '';
  subTaskTitleEdit = '';
  subtaskEdited: any = null
  categories: Category[] = [];
  messageError: string = ''
  isAddingSubtask: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private taskService: TaskService,
    private _elementRef: ElementRef
  ) {
    // dialogRef.disableClose = true;
  }

  @HostListener('click', ['$event'])
  onLocalClick(event: Event | any) { 
    if(this.subtaskEdited && event.target.className !== "form-edit-sub-task" 
    && event.target.parentElement.className !== "form-edit-sub-task"
    ) {
      const indexOfSubTaskEdited = this.subTasks.findIndex((subTask) => subTask.id == this.subtaskEdited.id);
      
      const inputSubTaskEl = this._elementRef.nativeElement.querySelector('.subtask-editing-ipt');
      if(!inputSubTaskEl) { return; }
      inputSubTaskEl.value = this.subTasks[indexOfSubTaskEdited].title;
      this.subTaskTitleEdit = '';
      this.subtaskEdited = null;
    }
  }

  ngOnInit(): void {     
    this.taskForm = this.formBuilder.group({
      id: [this.data?.id || uuidv4()],
      title: [this.data?.title || '', [Validators.required, Validators.minLength(3)]],
      completed: [this.data?.completed || false],
      category: [this.data?.category || '', [Validators.required]],
      endDate: [this.data?.endDate || null, [Validators.required, createDatePickerValidator()]],
    });

    this.subTasks = this.data?.subTasks || [];
    this.handleFetchCategory();    
    
  }

  handleFetchCategory() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.log(error),
      complete: () => console.info("Fetch categories")
    })
  }

  handleChangeTaskValue() {              
    if (this.taskForm.status != 'INVALID') { 

      if(!this.handleCheckDueDate(this.taskForm.value.endDate)) { return; }

      if(this.data) { //edit
        this.taskService.editTask({...this.taskForm.value, subTasks: this.subTasks})
        .subscribe({
          next: () => this.dialogRef.close(this.taskForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      } else { //Add
        this.taskService.addTask({...this.taskForm.value, subTasks: this.subTasks}).subscribe({
          next: () => this.dialogRef.close(this.taskForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  handleCheckDueDate(endDate: Date) {
    if(Date.now() > new Date(endDate).getTime()) {
      this.formState.endDate.setErrors({'incorrect': true, message: 'End date is less than current date'});
      
      return false;
    }

    return true;
    
  }
  
  handleChangeCompletedAllSubTask(e: any) {
    if(this.subTasks.length == 0) { return; }
  
      this.subTasks.forEach((subTask) => {
        subTask.completed = !subTask.completed;
      })
    
  }

  handleCheckStatusOfCheckboxs() {
    if(this.subTasks.length == 0) { return; }
    const newSubTasks = this.subTasks.filter((subTask) => subTask.completed)

    if(newSubTasks.length > 0 && newSubTasks.length < this.subTasks.length) {
      return { checked: false, indeterminate: true }
    } else if (newSubTasks.length == this.subTasks.length) {
      return { checked: true, indeterminate: false }
    } else {
      return { checked: false, indeterminate: false }
    }
  }

  handleChangeSubtask(event: any) {
    if(event.key === 'Enter' || event.keyCode === 13) {
      this.handleAddSubTask();
    }
  }

  handleClickOpenEditSubtask(subTask: SubTask, event: Event) {
    this.subtaskEdited = subTask;
    console.log(event);
  }

  handleUpdateStateSubtaskByCheckbox(indexSubtask: number) {
    this.subTasks[indexSubtask].completed = !this.subTasks[indexSubtask].completed;    
  }

  handleUpdateSubtaskByInput(indesSubtask: number, event: any) {
    this.subTaskTitleEdit = event.target.value;
  }

  onClickUpdateSubtask(indexSubtask: number) {
    if(this.subTasks.length == 0) { return; }
    this.subTasks[indexSubtask].title = this.subTaskTitleEdit;
    this.subTaskTitleEdit = '';
  }

  handleDeleteSubtask(indexSubtask?: number) {
    if(indexSubtask) {
      this.subTasks.splice(indexSubtask, 1);
    } else {
      this.subTasks = [];
    }
  }

  handleAddSubTask() {
    if( this.subTaskText.trim() == '') { return; }
    this.subTasks.push({id: uuidv4(), title: this.subTaskText, completed: false})
    this.subTaskText = '';
  }

  handleCalculateProgress() {
   if(this.subTasks.length == 0) { return 0;}
   let countCompleted = 0;
  
   this.subTasks.forEach((subTask) => {
    if(subTask.completed) {
      countCompleted++;
    }
   });
   
   return (100 / this.subTasks.length * countCompleted).toFixed(0);
  }

  get formState(): any {
    return this.taskForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
