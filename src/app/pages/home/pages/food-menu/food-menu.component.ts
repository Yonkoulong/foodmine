import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FoodCategory } from "src/app/shared/models/FoodCategory";
import { slugifyVietnamese } from "src/app/shared/utilities/app.util";

@Component({
    selector: 'fm-menu',
    templateUrl: './food-menu.component.html',
    styleUrls: ["./food-menu.component.scss"]
})

export class FoodMenuComponent {
    
    foodCategories: FoodCategory[] = [
        {
            id: "2",
            name: "pizza",
            imageFood: "../../../../../assets/icons/foods/pizza-icon.png"
        },
        {
            id: "3",
            name: "Burger",
            imageFood: "../../../../../assets/icons/foods/burger.png"
        },
        {
            id: "4",
            name: "French Fires",
            imageFood: "../../../../../assets/icons/foods/french-fried.png"
        },
        {
            id: "5",
            name: "Chicken pack",
            imageFood: "../../../../../assets/icons/foods/chicken.png"
        },
        {
            id: "5",
            name: "Chicken pack",
            imageFood: "../../../../../assets/icons/foods/chicken.png"
        },
        {
            id: "5",
            name: "Chicken pack",
            imageFood: "../../../../../assets/icons/foods/chicken.png"
        },
        {
            id: "5",
            name: "Chicken pack",
            imageFood: "../../../../../assets/icons/foods/chicken.png"
        },
    ] 

    constructor(private router: Router) {}

    handleClickFoodMenuItem(dishName: string) {
        const slugifyDishName = slugifyVietnamese(dishName);
        this.router.navigate([`foodmine/${slugifyDishName}`])
    }

    
}