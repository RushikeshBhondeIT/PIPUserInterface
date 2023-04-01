import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditEmployeeComponent } from './Components/edit-employee/edit-employee.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component'; 
import { TwoFactorAuthenticationComponent } from './Components/two-factor-authentication/two-factor-authentication.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'log-in',component:LogInComponent},
  {path:'register-user',component:RegisterUserComponent},
  {path:'two-factor-authentication',component:TwoFactorAuthenticationComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'edit-employee',component:EditEmployeeComponent},
  {path:'create-employee',component:CreateEmployeeComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'', redirectTo:'/log-in',pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
