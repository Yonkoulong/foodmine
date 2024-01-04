import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { TaskListComponent } from './components/pages/todo-app/task-list/task-list.component';
import { TaskItemComponent } from './components/pages/todo-app/task-item/task-item.component';
import { TaskFormComponent } from './components/pages/todo-app/task-form/task-form.component';
import { CategoryComponent } from './components/pages/todo-app/category/category.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';

//Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToRequriePipe } from './shared/pipes/toRequire.pipe';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SignupComponent,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent,
    CategoryComponent,
    ToRequriePipe
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
