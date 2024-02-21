import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food/food.service';
import { LIST_OF_TYPE_FOOD } from '../../../constants/food-management-app.constant';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
})

export class AddFoodComponent {
  foodForm: Food | any;
  listTypeOfFood = LIST_OF_TYPE_FOOD;

  constructor(
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Food,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private foodService : FoodService
  ) {
    
  }

  ngOnInit(): void {     
    this.foodForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', Validators.required],
      type: ['', Validators.required],
      cookingTime: ['', Validators.required],
      imageFood: ['', [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)')]],
    });  
  }

  handleChangeFoodValue() {         
    if (this.foodForm.status != 'INVALID') { 
      if(this.isEmptyObject(this.data)) { //edit
        this.foodService.editFood({...this.foodForm.value})
        .subscribe({
          next: () => this.dialogRef.close(this.foodForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      } else { //Add
        this.foodService.addFood({...this.foodForm.value}).subscribe({
          next: () => this.dialogRef.close(this.foodForm),
          error: (error) => console.log(`Error: ${error}`),
          complete: () => console.info('complete')
        });
      }
    } else {
      this.foodForm.markAllAsTouched();
    }
  }

  handlePreventEnterForm(event: KeyboardEvent) {
    if(event.key === 'Enter' || event.code === 'Enter') {
      event.preventDefault();
    }
  }

  get formState(): any {
    return this.foodForm.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isEmptyObject(object: {}) {
    if(Object.keys(object).length) {
      return true;
    } 
    return false;
  }
}