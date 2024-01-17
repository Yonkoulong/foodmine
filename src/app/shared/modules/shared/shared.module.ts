import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from '../material/mat.module';
import { ShareDirectiveModule } from '../../directives/share.directive';
import { SharePipeModule } from '../../pipes/share.pipe';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareDirectiveModule,
    SharePipeModule,
    MatModule
  ],
  exports: [
    CommonModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    ShareDirectiveModule,
    SharePipeModule,
  ]
})
export class SharedModule { }
