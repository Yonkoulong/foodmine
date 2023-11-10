import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: Food[] = [];
  
  constructor(private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.handleFetchTasks();
  }

  handleFetchTasks() {
    this.foodService.getAll().subscribe({
      next: (foods) => this.foods = foods,
      error: (error) => console.log(`Error: ${error}`),
      complete: () => console.info('complete')
    })
  }
}
