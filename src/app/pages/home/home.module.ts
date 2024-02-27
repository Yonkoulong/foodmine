import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/modules/shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";

import { FoodListComponent } from "./pages/food-list/food-list.component";
import { UserCartComponent } from "./pages/user-cart/user-cart.component";
import { HomeComponent } from "./home.component";
import { FoodMenuComponent } from "./pages/food-menu/food-menu.component";
import { FoodBannerComponent } from "./pages/food-banner/food-banner.component";
import { ListOrderComponent } from "./pages/user-cart/pages/list-order/list-order.component";


@NgModule({
    declarations: [
        HomeComponent,
        FoodMenuComponent,
        FoodListComponent,
        UserCartComponent,
        ListOrderComponent
    ],
    imports: [HomeRoutingModule, CommonModule, SharedModule,FoodBannerComponent ],
    exports: []
})

export class HomeModule {}