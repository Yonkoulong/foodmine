import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './pages/components/sidebar/sidebar.component';
import { SigninComponent } from './pages/auth/pages/signin/signin.component';
import { SignupComponent } from './pages/auth/pages/signup/signup.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from './shared/modules/shared/shared.module';
import { ConfirmComponent } from './shared/components/dialog/confirm/confirm.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SwiperModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ConfirmComponent,
    SigninComponent,
    SignupComponent,
    SidebarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
