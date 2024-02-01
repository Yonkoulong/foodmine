import { Component } from "@angular/core";

@Component({
    selector: 'food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss']
})

export class FoodListComponent {
    listFoodById = [
        { 
            name: "Pizza with Peperoni",
            timeComplete: '14-20 minutes',
            price: 12,
            imgUrl: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        { 
            name: "Pizza with Peperoni",
            timeComplete: '16-25 minutes',
            price: 12,
            imgUrl: 'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ]
    constructor() {
        
    }

}