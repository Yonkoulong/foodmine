import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharePipeModule } from './shared/pipes/share.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { TaskListComponent } from './components/pages/todo-app/task-list/task-list.component';
import { TaskItemComponent } from './components/pages/todo-app/task-item/task-item.component';
import { CategoryComponent } from './components/pages/todo-app/category/category.component';
import { SignupComponent } from './components/pages/auth/signup/signup.component';
import { AddTaskComponent } from './components/pages/todo-app/dialog/add-task/add-task.component';
import { AddCategoryComponent } from './components/pages/todo-app/dialog/add-category/add-category.component'

//Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShareDirectiveModule } from './shared/directives/share.directive';
import { TaskDetailComponent } from './components/pages/todo-app/task-detail/task-detail.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { TodoModule } from './components/pages/todo-app/todo/todo.module';
import { SharedModule } from './shared/modules/shared/shared.module';
import { ConfirmComponent } from './shared/components/dialog/confirm/confirm.component';

@NgModule({
  imports: [
    BrowserModule,
    TodoModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SignupComponent,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    NotFoundComponent,
    ConfirmComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
