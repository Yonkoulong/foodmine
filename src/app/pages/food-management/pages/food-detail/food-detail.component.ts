import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { FoodService } from 'src/app/services/food/food.service';
import { Subject, interval, takeUntil } from 'rxjs';
import { TYPE_OF_DIALOG } from '../../constants/food-management-app.constant';
import { ConfirmComponent } from 'src/app/shared/components/dialog/confirm/confirm.component';
import { AddFoodComponent } from '../../components/dialog/add-food/add-food.component';
import { MatDialog } from '@angular/material/dialog';
import { FoodManagementComponent } from '../../food-management.component';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent implements OnInit {
  foodId: string = "";
  foodDetail: Food | any = {};
  private unsubscribe$ = new Subject<void>();
  
  constructor(private route: ActivatedRoute, private router: Router, 
    public dialog: MatDialog, private foodService: FoodService, 
    private foodManagement: FoodManagementComponent) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
        this.foodId = params.get('id') || '';      
        if(this.foodId === '') return;
        this.handleFetchFoodDetail();
    });
  }

  // ngOnDestroy(): void {    
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }

  handleFetchFoodDetail() {
    this.foodService.getFoodById(this.foodId).subscribe({
      next: (food: Food) => this.foodDetail = food,
      error: (error: any) => {
        if(error.status === 404) {          
          this.router.navigate(["/food-management"]);
        }
      },  
      complete: () => console.info('')
    })
  }

  openDialog(): void {
    let dialogRef : any;
    
    dialogRef = this.dialog.open(AddFoodComponent, {
      data: this.foodDetail,
      maxWidth: '50vw',
    });

    dialogRef.afterClosed().subscribe((result: Food) => {
      if(result) {
        this.handleFetchFoodDetail();
        this.foodManagement.handleFetchFoods();
      }
    });

  }  
}
