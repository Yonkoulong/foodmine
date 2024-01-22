import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { TaskItemComponent } from './pages/task-item/task-item.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddCategoryComponent } from './components/dialog/add-category/add-category.component';
import { AddTaskComponent } from './components/dialog/add-task/add-task.component';

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
  exports: [],
})
export class TodoModule {}
