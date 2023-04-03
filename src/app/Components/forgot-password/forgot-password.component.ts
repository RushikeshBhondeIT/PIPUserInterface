import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/Models/change-password';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string;
  errmsg: string;
  message: string;
  status: string;
  token: any;
  resetToken: string = "";
  link: string = "";

  changePassword: ChangePassword = new ChangePassword();


  constructor(private accService: AccountsControllerService, private serverInfo: ServerInformationService , private router:Router) {
  }
  ngOnInit() {

  }



  // public async ForgotPassword() {
  //   await this.accService.ForgotPasswordApiCall(this.email).subscribe(res => {
  //     if (res != null) {
  //       this.message = res.message;
  //       this.status = JSON.stringify(res.status);
  //       if (this.status == 'Error') {
  //         this.serverInfo.showErrorMessage('Error!',
  //           this.message,
  //           'error',
  //           true,)
  //       }
  //       else {
  //         this.serverInfo.showSuccessMessage('Success!',
  //           this.message,
  //           'success',
  //           true,)
  //       }
  //     }
  //   });
  // }



  ForgotPassword() {
    this.accService.ForgotPasswordApiCall(this.email).subscribe(res => {
      if (res != null) {
        this.link = res.status;
        this.message = res.message;
        this.serverInfo.showSuccessMessage('Success',
          this.message,
          'success',
          true,)
        this.ResetPassword(this.link);
      }
    }, e =>{
      this.serverInfo.showErrorMessage('error',
      e.error.message,
      'error',
      true,)
    });
  }

  ResetPassword(link: string) {
    this.accService.ResetPasswordApiCall(link).subscribe(res => {
      if (res != null && res.status==200) {
        this.link = res.status;
        this.message = res.message;
        var model = res.model;
        this.resetToken = model["token"];
        localStorage.setItem('resetPasswordToken',this.resetToken);
        this.router.navigateByUrl('/change-password');
        this.serverInfo.showSuccessMessage('Success',
        'reset password',
        'error',
        true,)
        
      }
    },e =>{
      this.serverInfo.showErrorMessage('error',
      e.error.message,
      'error',
      true,)
    });
    this.router.navigateByUrl('/change-password');
  }

  // ChangePassword() {
  //   this.changePassword.token = localStorage.getItem('resetPasswordToken');
  //   alert(this.changePassword);
  //   this.accService.ChangePasswordApiCall(this.changePassword).subscribe(res => {
  //     if (res != null) {
  //       this.status = res.status;
  //       this.message = res.message;
  //     }
  //   });
  // }
}
