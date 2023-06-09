import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from  '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component';
import { UniversalAppInterceptorService } from './Services/universal-app-interceptor.service';
import { LogInComponent } from './Components/log-in/log-in.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TwoFactorAuthenticationComponent } from './Components/two-factor-authentication/two-factor-authentication.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LeapYearComponent } from './Components/leap-year/leap-year.component';
import { HeaderComponent } from './Components/header/header.component';
import { NonAppHeaderComponent } from './Components/non-app-header/non-app-header.component';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LogInComponent,
    TwoFactorAuthenticationComponent,
    DashboardComponent,
    EditEmployeeComponent,
    CreateEmployeeComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LeapYearComponent,
    HeaderComponent,
    NonAppHeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    DataTablesModule,
    Ng2SearchPipeModule, 
    
  
  ],
  providers: [
    NgModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalAppInterceptorService,
      multi: true,
    },
    DatePipe,
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
