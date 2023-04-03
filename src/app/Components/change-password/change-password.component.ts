import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/Models/change-password';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {


  email: string;
  errmsg: string;
  message: string;
  status: string;
  token: any;
  resetToken: string = "";
  link: string = "";
  registerForm: FormGroup;
  submitted: boolean = false;
  changePassword: ChangePassword = new ChangePassword();
  constructor(private accService: AccountsControllerService, private serverInfo: ServerInformationService, private router: Router, private local: LocalStorageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  ChangePassword() {
    if (this.changePassword.password == this.changePassword.confirmPassword) {
      this.changePassword.token = localStorage.getItem('resetPasswordToken');
      alert(this.changePassword.token);
      this.accService.ChangePasswordApiCall(this.changePassword).subscribe(res => {
        if (res != null) {
          this.status = res.status;
          this.message = res.message;
          this.serverInfo.showSuccessMessage('Password Changed!',
            this.message,
            'success',
            true,)
        }
      }, e => {
        this.serverInfo.showErrorMessage('Error',
          e.error.message,
          'error',
          true,)
        this.local.LogOut();
        this.router.navigateByUrl('/log-in');
      });

    }
  }
}
