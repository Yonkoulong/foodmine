import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';

const routes: Routes = [
  {
    path: 'todo-app',
    component: TaskListComponent,
    title: 'todo list',
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'todo-app/:id',
    component: TaskDetailComponent,
    title: 'task detail',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
