import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';

import { UniversalAppInterceptorService } from './Services/universal-app-interceptor.service';
import { LogInComponent } from './Components/log-in/log-in.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    NgModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptorService,
      multi: true,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
