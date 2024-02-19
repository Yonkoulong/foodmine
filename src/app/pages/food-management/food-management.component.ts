import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food-management',
  templateUrl: './food-management.component.html',
  styleUrls: ['./food-management.component.scss'],
  // template: '<div>Food Management</div>'
})
export class FoodManagementComponent {
  constructor() {
    console.log('Food Management Component');
  }
}
