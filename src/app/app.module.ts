import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SigninComponent } from './pages/auth/pages/signin/signin.component';
import { SignupComponent } from './pages/auth/pages/signup/signup.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from './shared/modules/shared/shared.module';
import { ConfirmComponent } from './shared/components/dialog/confirm/confirm.component';
import { SwiperModule } from 'swiper/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer, UserEffects } from './store/user';
import { AuthInterceptor } from './services/Interceptor/authinterceptor.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SwiperModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects]),
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
