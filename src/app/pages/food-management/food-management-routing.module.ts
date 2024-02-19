import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';
import { FoodManagementComponent } from './food-management.component';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';


const routes: Routes = [
  {
    path: 'food-management',
    component: FoodManagementComponent,
    title: 'food management', 
    children: [
      {
        path: ':id',
        component: FoodDetailComponent, 
        title: 'food detail'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class FoodManagementRoutingModule {}
