import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInModel } from 'src/app/Models/log-in-model';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
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
  constructor(private empService: AccountsControllerService, private localStorage: LocalStorageService, private route: Router) {
  }


  LogIn() {
    this.empService.logInApiCall(this.logInModel).subscribe(res => {
      if (res != null || res.status == "Success") {
        this.localStorage.saveToken(res.token, res.expration);
        this.localStorage.loadToken();
        this.status = res.status;
        this.message = res.message;
        this.showSuccessMessage('Success',
          this.message,
          'success',
          true,)
        alert("Login event clicked");
        this.route.navigateByUrl('dashboard');
      }
      else {
        this.message = res.message;
        this.showErrorMessage('Error',
          this.message,
          'success',
          true,)
      }

    });
  }



  showErrorMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      showCancelButton: showCancelButton
    })
  }

  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })
  }
}
