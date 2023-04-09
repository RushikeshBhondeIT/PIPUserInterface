import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { LeapYearComponent } from './Components/leap-year/leap-year.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component'; 
import { TwoFactorAuthenticationComponent } from './Components/two-factor-authentication/two-factor-authentication.component';
import { AuthGuard } from './SharedServices/auth.guard';

const routes: Routes = [
  {path:'log-in',component:LogInComponent},
  {path:'register-user',component:RegisterUserComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'two-factor-authentication',component:TwoFactorAuthenticationComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'edit-employee',component:EditEmployeeComponent,canActivate:[AuthGuard]},
  {path:'create-employee',component:CreateEmployeeComponent,canActivate:[AuthGuard]},
  {path:'leap-year',component:LeapYearComponent,canActivate:[AuthGuard]},
  {path:'', redirectTo:'/log-in',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
