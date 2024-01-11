import { NgModule } from '@angular/core';
import { ToRequiredPipe } from "./toRequire.pipe";
import { ExpiryDateTaskPipe } from './expiryDateTask.pipe';

@NgModule({
    imports : [],
    declarations: [ToRequiredPipe, ExpiryDateTaskPipe],
    exports : [ToRequiredPipe, ExpiryDateTaskPipe],
})

export class SharePipeModule {}