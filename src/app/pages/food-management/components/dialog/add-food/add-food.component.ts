import { Component, Inject, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food/food.service';
import { LIST_OF_TYPE_FOOD } from '../../../constants/food-management-app.constant';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

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
    private foodService : FoodService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {         
    this.foodForm = this.formBuilder.group({
      name: [ this?.data?.name || '', [Validators.required, Validators.minLength(3)]],
      price: [this?.data?.price || '', Validators.required],
      type: [this.data.type || '', Validators.required],
      cookingTime: [this.data.cookingTime || '', Validators.required],
      imageFood: [this.data.imageFood || '', [Validators.required, Validators.pattern('(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)')]],
    });  
  }

  handleChangeFoodValue() {         
    if (this.foodForm.status != 'INVALID') { 
      if(this.isEmptyObject(this.data)) { //edit
        this.foodService.editFood({...this.foodForm.value, _id: this.data._id})
        .subscribe({
          next: (foodEdited) =>{ 
            this.snackbar.openSnackBar("Edit food success!", "success")
          },
          error: (error) => {
            if(error.status === 404) {      
              this.snackbar.openSnackBar("Edit food failed!", "failed")    
              this.router.navigate(["/food-management"]);
            }
            
          },
          complete: () => this.dialogRef.close({data: this.foodForm.value})
        });
      } else { //Add
        this.foodService.addFood(this.foodForm.value).subscribe({
          next: () => {
            this.snackbar.openSnackBar("Add food success!", "success"),
            this.dialogRef.close({data: this.foodForm.value}) 
          },
          error: (error) => {
            if(error.status === 404) {      
              this.snackbar.openSnackBar("Add food failed!", "failed")    
            }
          },
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