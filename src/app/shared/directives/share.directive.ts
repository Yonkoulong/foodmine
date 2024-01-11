import { NgModule } from '@angular/core';
import { OnlyInputNumber } from "./only-input-number.directive";

@NgModule({
    imports : [OnlyInputNumber],
    exports : [OnlyInputNumber],
})

export class ShareDirectiveModule {}