import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { AuthenticationGuard } from 'src/app/shared/guard/auth/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    title: 'todo list'
  },
  {
    path: ':id',
    component: TaskDetailComponent,
    title: 'task detail',
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
