import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInModel } from 'src/app/Models/log-in-model';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  logInModel: LogInModel = new LogInModel();
  message: string = ""
  status: string = ""
  errmsg: string;
  constructor(private empService: AccountsControllerService, private localStorage: LocalStorageService, private route: Router,private serverInfo:ServerInformationService) {
  }

  LogIn() {
    this.localStorage.setItem("userName", this.logInModel.userName);
    this.empService.logInApiCall(this.logInModel).subscribe(res => {
      if (res != null || res.status == "Success") {
        this.localStorage.saveToken(res.token, res.expration);
        this.localStorage.loadToken();
        this.message = res.message;
        this.status = res.status;
        this.serverInfo.showSuccessMessage('Logged In Successfully!',
          this.message,
          'success',
          true,)
        this.route.navigateByUrl('dashboard');
      }
    });
    this.message = 'Please enter Valid userName And Password';
    this.serverInfo.showErrorMessage('Error',
      this.message,
      'error',
      true)
    this.route.navigateByUrl('/log-in');
  }



  // showErrorMessage(
  //   title, message, icon = null,
  //   showCancelButton = true) {
  //   return Swal.fire({
  //     title: title,
  //     text: message,
  //     icon: 'error',
  //     showCancelButton: showCancelButton
  //   })
  // }

  // showSuccessMessage(
  //   title, message, icon = null,
  //   showCancelButton = true) {
  //   return Swal.fire({
  //     title: title,
  //     text: message,
  //     icon: icon,
  //     showCancelButton: showCancelButton
  //   })
  // }
}
