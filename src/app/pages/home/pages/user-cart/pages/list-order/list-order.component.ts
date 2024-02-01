import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'fm-list-order',
    templateUrl: './list-order.component.html',
    styleUrls: ['./list-order.component.scss']

})

export class ListOrderComponent {
    listOrderDish = [
        {
            imgUrl: "",
            dishName: "Pizza with Mushrooms",
            noted: "Extra tomoto",
            price: "40",
            createdAt: ""
        },
        {
            imgUrl: "",
            dishName: "Meat with Potato",
            noted: "Extra tomoto",
            price: "40",
            createdAt: ""
        },
        {
            imgUrl: "",
            dishName: "Meat with Potato Meat with Potato",
            noted: "Extra tomoto",
            price: "40",
            createdAt: ""
        }
    ]
    
    // ngOnInit(): void {
    //     throw new Error("Method not implemented.");
    // }
    
}

