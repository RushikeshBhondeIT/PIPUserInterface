import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogInModel } from 'src/app/Models/log-in-model';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  logInModel: LogInModel = new LogInModel();
  message: string = ""
  status: string = ""
  errorMessage: string;
  constructor(private empService: AccountsControllerService,
    private localStorage: LocalStorageService,
    private route: Router,
    private serverInfo: ServerInformationService) {
  }

  LogIn() {
    this.localStorage.setItem("email", this.logInModel.email);
    this.logInToLeapYear(this.logInModel);
    this.empService.logInApiCall(this.logInModel).subscribe(res => {
      if (res) {
        this.localStorage.saveToken(res.token, res.expration);
        this.localStorage.loadToken();
        this.message = res.message;
        this.status = res.status;
        this.route.navigateByUrl('dashboard');
      }
    }, error => {
      console.log(error.message)
      this.serverInfo.showErrorMessage('Error',
        this.errorMessage = error.error.message,
        'error',
        false,)
    });
    this.route.navigateByUrl('/log-in');
  }

  logInToLeapYear(loginModel: LogInModel) {
    this.serverInfo.logInToLeapYearsApiCall(loginModel).subscribe(res => {
      if (res) {
        console.log('Leap Year Logged In Successfully !');
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }
}
