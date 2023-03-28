import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './Components/log-in/log-in.component';
import { RegisterUserComponent } from './Components/register-user/register-user.component'; 

const routes: Routes = [
  {path:'log-in',component:LogInComponent},
  {path:'register-user',component:RegisterUserComponent},
  {path:'', redirectTo:'/log-in',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
