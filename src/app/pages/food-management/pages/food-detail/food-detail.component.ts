import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent {
  foodId: string = "";
  foodDetail: Food | any = {};
  
  constructor(private route: ActivatedRoute, private foodService: FoodService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.foodId = params.get('id') ?? '';
    });

    if(this.foodId === '') return;
    this.handleFetchFoodDetail();
  }

  handleFetchFoodDetail() {
    this.foodService.getFoodById(this.foodId).subscribe({
      next: (food: Food) => this.foodDetail = food,
      error: (error: any) => console.log(`Error: ${error}`),
      complete: () => console.info('')
    })
  }
 }
