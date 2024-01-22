import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthenticationGuard } from './shared/guard/auth/authentication.guard';
import { SignupComponent } from './pages/auth/pages/signup/signup.component';
import { SigninComponent } from './pages/auth/pages/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'sign-in',
    component: SigninComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'todo-app',
    loadChildren: () =>
      import('./pages/todo-app/todo.module').then((m) => m.TodoModule),
    canActivate: [AuthenticationGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
