import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { TYPE_OF_DIALOG } from './constants/food-management-app.constant';
import { AddFoodComponent } from './components/dialog/add-food/add-food.component';
import { ConfirmComponent } from 'src/app/shared/components/dialog/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from 'src/app/services/food/food.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.scss'],
})

export class FoodManagementComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'type', 'cookingTime', "action"];
  dataSource: Food[] = [];
  foodEdit: Food | any = null;
  currentFoodDetailId = '';

  constructor(private router: Router, private foodService: FoodService, public dialog: MatDialog) {}

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

  handleEditFood(food: Food) {    
    this.foodEdit = food;
    this.handleFetchFoods();
  }

  handleShowFoodDetails(e: MouseEvent, id: string) {
    if((e.target as HTMLElement)?.classList.contains("mat-icon")) return;
    
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
      description: 'Are you sure to delete this food',
      foodId: id
    }, TYPE_OF_DIALOG.DELETE)
  }

  open(com: any, data: any, purpose: string) {
    const dialogRef = this.dialog.open(com, { data, maxWidth: '50vw'});

    dialogRef?.afterClosed().subscribe(result => {      
      if(result) {  
        switch(purpose) {
          case TYPE_OF_DIALOG.CREATE: this.handleFetchFoods();
          break;
          case TYPE_OF_DIALOG.DELETE: this.handleDeleteFood(data?.foodId);
          break;
        }
      }
    });
  }
}
