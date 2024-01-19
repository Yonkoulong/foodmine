import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { TaskItemComponent } from './task-item/task-item.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './dialog/add-category/add-category.component';
import { AddTaskComponent } from './dialog/add-task/add-task.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
    CategoryComponent,
    AddTaskComponent,
    AddCategoryComponent,
  ],
  imports: [CommonModule, TodoRoutingModule, SharedModule],
  exports: [CommonModule],
})
export class TodoModule {}
