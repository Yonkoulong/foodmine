import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodManagementRoutingModule } from './food-management-routing.module';
import { FoodManagementComponent } from './food-management.component';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { AddFoodComponent } from './components/dialog/add-food/add-food.component';

@NgModule({
  declarations: [
    FoodManagementComponent,
    FoodDetailComponent,
    AddFoodComponent,
  ],
  imports: [
    FoodManagementRoutingModule,
    CommonModule,
    SharedModule,
    MatTableModule,
  ],
  exports: [],
})
export class FoodManagementModule {}
