import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';

import { HomeComponent } from './home.component';
import { FoodListComponent } from './pages/food-list/food-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'food mine', 
    children: [
      {
        path: ':id',
        component: FoodListComponent, 
        title: 'food type'
      },
      {
        path: '',
        component: FoodListComponent, 
        title: 'food type'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
