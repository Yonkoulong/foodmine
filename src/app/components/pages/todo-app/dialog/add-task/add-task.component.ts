import {Component, Inject, Output} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Task } from 'src/app/shared/models/Task';
import { v4 as uuidv4 } from 'uuid';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/Category';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})

export class AddTaskComponent {
  taskForm: Task | any;
  categories: Category[] = [];
  message: string = ''
  
  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private taskService: TaskService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {     
    this.taskForm = this.formBuilder.group({
      id: [this.data?.id || uuidv4()],
      title: [this.data?.title || '', Validators.required],
      completed: [this.data?.completed || false],
      category: [this.data?.category || 0, Validators.required],
      startDate: [this.data?.startDate || null, Validators.required],
      endDate: [this.data?.endDate || null, Validators.required]
    })

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

      if(!this.handleCheckDueDate(this.taskForm.value)) { return; }

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

  handleCheckDueDate(value: Task) {
    return value;
  }

  get formState(): any {
    return this.taskForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
