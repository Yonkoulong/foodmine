import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { AuthenticationGuard } from './shared/guard/auth/authentication.guard';
import { TaskDetailComponent } from './components/pages/todo-app/task-detail/task-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title:'home', canActivate: [AuthenticationGuard], children: [
    {
      path: ':id',
      component: TaskDetailComponent,
      title: 'task detail',
    },
  ], },
  { path: 'login', component: LoginComponent, title: 'sign in' },
  { path: 'sign-up', component: SignupComponent, title: 'sign up' },
  { path: '**', component: NotFoundComponent},  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
