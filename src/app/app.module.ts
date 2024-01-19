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
import { SignupComponent } from './components/pages/auth/signup/signup.component';

import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { TodoModule } from './components/pages/todo-app/todo.module';
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
