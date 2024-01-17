import {Component, Inject, Output} from '@angular/core';
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
  taskForm: Task | any;
  subTasks: SubTask[] = [];
  subTaskText: string = '';
  categories: Category[] = [];
  messageError: string = ''
  isAddingSubtask: boolean = false;
  
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {
    // dialogRef.disableClose = true;
  }

  ngOnInit(): void {     
    this.taskForm = this.formBuilder.group({
      id: [this.data?.id || uuidv4()],
      title: [this.data?.title || '', [Validators.required]],
      completed: [this.data?.completed || false],
      category: [this.data?.category || 0, [Validators.required]],
      endDate: [this.data?.endDate || null, [Validators.required, createDatePickerValidator()]]
    });

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
        this.taskService.editTask(this.taskForm.value)
        .subscribe({
          next: () => this.dialogRef.close(this.taskForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      } else { //Add
        this.taskService.addTask(this.taskForm.value).subscribe({
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

  handleChangeSubtask() {
    console.log(this.subTaskText);
  }

  handleAddSubTask() {
    // if(!task) { return; }
    // this.taskService.editTask(task).subscribe({
    //   next: () => this.handleFetchTasks(this.currentCategoryId || 0),
    //   error: (error) => console.log(`Error: ${error}`),
    //   complete: () => console.info('')
    // });
  }

  get formState(): any {
    return this.taskForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
