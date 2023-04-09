import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddCountry } from 'src/app/Models/add-country';
import { ChangePassword } from 'src/app/Models/change-password';
import { ConfirmEmail } from 'src/app/Models/confirm-email';
import { CountryResponse } from 'src/app/Models/country-response';
import { LogInModel } from 'src/app/Models/log-in-model';
import { RegisterUser } from 'src/app/Models/register-user.model';
import { TwoFactorAuth } from 'src/app/Models/two-factor-auth';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userRegister: RegisterUser = new RegisterUser();
  confirmEmailModel: ConfirmEmail = new ConfirmEmail();
  tfaAuth: TwoFactorAuth = new TwoFactorAuth();
  selectedTeam: string = "Admin";
  status: string = "";
  message: string = "";
  email: string = "";
  addCountries: AddCountry = new AddCountry();
  countryRespose: CountryResponse = new CountryResponse();
  model: string;

  constructor(private empService: AccountsControllerService,
    private localStorage: LocalStorageService,
    private route: Router,
    private serverInfo: ServerInformationService) {
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.empService.registerUser(this.userRegister, this.selectedTeam).subscribe(res => {
      if (res) {
        this.status = res.status;
        this.message = res.message;
        this.serverInfo.showSuccessMessage('Success',
          this.message,
          'success',
          false,)
        this.route.navigateByUrl('/log-in');
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showSuccessMessage('Error',
        error.error.message,
        'error',
        false,)
    });
  }


  onSelected(value: string): void {
    this.selectedTeam = value;
  }

  confirmEmail() {
    this.empService.confirmEmail(this.confirmEmailModel).subscribe(res => {
      if (res) {
        this.status = res.status;
        this.message = res.message;
        this.serverInfo.showErrorMessage('Success',
          res.message,
          'success',
          false,)
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }

  TFAlogIn() {
    this.empService.TFAlogInApiCall(this.tfaAuth).subscribe(res => {
      if (res) {
        this.status = res.status;
        this.message = res.message;
        this.serverInfo.showErrorMessage('Success',
          res.message,
          'success',
          false,)
      }
    }, error => {
      console.log(error.message);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }


  AddCountry() {
    this.empService.AddCountryApiCall(this.addCountries).subscribe(res => {
      if (res) {
        this.countryRespose.countryId = res.countryId,
          this.countryRespose.countryName = res.countryName
        this.serverInfo.showErrorMessage('Success',
          res.message,
          'success',
          false,)
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
