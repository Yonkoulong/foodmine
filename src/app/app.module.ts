import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { TaskListComponent } from './components/pages/todo-app/task-list/task-list.component';
import { TaskItemComponent } from './components/pages/todo-app/task-item/task-item.component';
import { TaskFormComponent } from './components/pages/todo-app/task-form/task-form.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
