import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/Category';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categoryForm: Category | any;
  message: string = ''
  
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    // dialogRef.disableClose = true;
  }

  ngOnInit(): void {     
    this.categoryForm = this.formBuilder.group({
      id: [this.data?.id || uuidv4()],
      name: [this.data?.name || '', Validators.required],
    })
  }

  handleClickCreateCategory() {  
    if (this.categoryForm.status != 'INVALID') { 
      if(this.data) { //edit
        // this.categoryForm.editTask(this.categoryForm.value)
        // .subscribe({
        //   next: () => this.dialogRef.close(this.categoryForm),
        //   error: (error: any) => console.log(`Error: ${error}`),
        //   complete: () => console.info('complete')
        // });
      } else { //Add
        this.categoryService.addCategory(this.categoryForm.value).subscribe({
          next: () => this.dialogRef.close(this.categoryForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      }
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  get formState(): any {
    return this.categoryForm.controls;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
