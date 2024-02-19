import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodManagementRoutingModule } from "./food-management-routing.module";
import { FoodManagementComponent } from "./food-management.component";
import { FoodDetailComponent } from "./pages/food-detail/food-detail.component";
import { SharedModule } from "src/app/shared/modules/shared/shared.module";


@NgModule({
    declarations: [FoodManagementComponent, FoodDetailComponent],
    imports: [FoodManagementRoutingModule, CommonModule, SharedModule],
    exports: []
})

export class FoodManagementModule {
}