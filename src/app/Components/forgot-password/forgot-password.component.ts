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
  message: string;
  status: string;
  token: any;
  resetToken: string = "";
  link: string = "";
  changePassword: ChangePassword = new ChangePassword();

  constructor(private accService: AccountsControllerService, private serverInfo: ServerInformationService, private router: Router) {
  }
  ngOnInit() {

  }

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
    }, e => {
      this.serverInfo.showErrorMessage('error',
        e.error.message,
        'error',
        true,)
    });
  }

  ResetPassword(link: string) {
    this.accService.ResetPasswordApiCall(link).subscribe(res => {
      if (res != null) {
        this.link = res.status;
        this.message = res.message;
        var model = res.model;
        this.resetToken = model["token"];
        localStorage.setItem('resetPasswordToken', this.resetToken);
        this.router.navigateByUrl('/change-password');
        this.serverInfo.showSuccessMessage('Success',
          'reset password',
          'success',
          true,)
      }
    }, e => {
      this.serverInfo.showErrorMessage('error',
        e.error.message,
        'error',
        true,)
    });
    this.router.navigateByUrl('/change-password');
  }
}
