import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { TYPE_OF_DIALOG } from './constants/food-management-app.constant';
import { AddFoodComponent } from './components/dialog/add-food/add-food.component';
import { ConfirmComponent } from 'src/app/shared/components/dialog/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/services/food/food.service';
import { Route, Router } from '@angular/router';

const ELEMENT_DATA: Food[] = [
  {id: "1", name: 'Hydrogen', price: 1.0079, imageFood: 'H', type: 'drink', cookingTime: '5 minutes'},
  {id: "2", name: 'Helium', price: 4.0026, imageFood: 'He', type: 'drink', cookingTime: '5 minutes'},
  {id: "3", name: 'Lithium', price: 6.941, imageFood: 'Li', type: 'drink', cookingTime: '5 minutes'},
  {id: "4", name: 'Beryllium', price: 9.0122, imageFood: 'Be', type: 'drink', cookingTime: '5 minutes'},
  {id: "5", name: 'Boron', price: 10.811, imageFood: 'B', type: 'drink', cookingTime: '5 minutes'},
  {id: "6", name: 'Carbon', price: 12.0107, imageFood: 'C', type: 'drink', cookingTime: '5 minutes'},
  {id: "7", name: 'Nitrogen', price: 14.0067, imageFood: 'N', type: 'drink', cookingTime: '5 minutes'},
  {id: "8", name: 'Oxygen', price: 15.9994, imageFood: 'O', type: 'drink', cookingTime: '5 minutes'},
  {id: "9", name: 'Fluorine', price: 18.9984, imageFood: 'F', type: 'drink', cookingTime: '5 minutes'},
  {id: "1", name: 'Neon', price: 20.1797, imageFood: 'Ne', type: 'drink', cookingTime: '5 minutes'},
];
@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.scss'],
})

export class FoodManagementComponent {
  constructor(private router: Router, private foodService: FoodService, public dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'price', 'type', 'cookingTime', "action"];
  dataSource = ELEMENT_DATA;
  foodEdit: Food | any = null;
  currentFoodDetailId = '';

  ngOnInit() {
    this.handleFetchFoods();
  }

  handleFetchFoods() {
    this.foodService.getFoods().subscribe({
      next: (foods) => this.dataSource = foods,
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    })
  }

  handleDeleteFood(id: string) {        
    this.foodService.deleteFood(id).subscribe({
      next: () => this.handleFetchFoods(),
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    });
  }

  handleEditTask(task: Food) {    
    this.foodEdit = task;
    this.handleFetchFoods();
  }

  handleShowFoodDetails(id: string) {
    this.router.navigate(["/food-management", id]);
    this.currentFoodDetailId = id;
  }

  openDialogCreateFood(): void {
    this.open(AddFoodComponent, {}, TYPE_OF_DIALOG.CREATE);
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
          case TYPE_OF_DIALOG.CREATE: this.handleFetchFoods();
          break;
          case TYPE_OF_DIALOG.DELETE: this.handleDeleteFood(data?.taskId);
          break;
        }
      }
    });
  }
}
