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
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userRegister: RegisterUser = new RegisterUser();
  confirmEmailModel: ConfirmEmail = new ConfirmEmail();
  logInModel: LogInModel = new LogInModel();
  tfaAuth: TwoFactorAuth = new TwoFactorAuth();
  changePassword: ChangePassword = new ChangePassword();
  selectedTeam : string = "";
  status: string = "";
  message: string = "";
  token: string = "";
  resetToken: string = "";
  email: string = "";
  link: string = "";
  addCountries: AddCountry = new AddCountry();
  countryRespose: CountryResponse = new CountryResponse();

  constructor(private empService: AccountsControllerService, 
    private localStorage: LocalStorageService,
    private route:Router,
    private serverInfo:ServerInformationService) {
  }
  ngOnInit(): void {
    //call message method and pass it the parameters on page load
   
  }
  // GetAllEmployee() {
  //   if (this.localStorage.isLoggedIn() == false) {
  //     this.empService.GetAllEmployeeApiCall().subscribe(res => {
  //       if (res != null || res.status == "Success") {
  //         this.status = res.status;
  //         this.message = res.message;
  //       }
  //     });
  //   }
  // }
  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true){
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })}
    
  

  registerUser() {
    this.empService.registerUser(this.userRegister, this.selectedTeam).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
        this.serverInfo.showSuccessMessage('Success',
        this.message,
        'success',
        true,)
        this.route.navigateByUrl('/log-in');
      }
    },e =>{
      this.serverInfo.showSuccessMessage('Error',
      e.error.message,
      'error',
      true,)
    });
  }


	onSelected(value:string): void {
		this.selectedTeam = value;
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
  
  confirmEmail() {
    alert("confirm event clicked");
    this.empService.confirmEmail(this.confirmEmailModel).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
      }
    });
  }


  LogIn() {
    alert("Login event clicked");
    this.empService.logInApiCall(this.logInModel).subscribe(res => {
      if (res != null || res.status == "Success") {
        alert("Logged in successfully" + " " + res.message);
        this.localStorage.saveToken(res.token, res.expration);
        this.localStorage.loadToken();
      }
    });
  }

  LogOut() {
    this.localStorage.LogOut();
  }

  TFAlogIn() {
    alert("Login event clicked");
    this.empService.TFAlogInApiCall(this.tfaAuth).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
      }
    });
  }

  ForgotPassword() {
    alert("ForgotPassword event clicked");
    this.empService.ForgotPasswordApiCall(this.email).subscribe(res => {
      if (res != null) {
        this.link = res.status;
        this.message = res.message;
        this.ResetPassword(this.link);
      }
    });
  }

  ResetPassword(link: string) {
    this.empService.ResetPasswordApiCall(link).subscribe(res => {
      if (res != null) {
        this.link = res.status;
        this.message = res.message;
        var model = res.model;
        this.resetToken = model["token"];
        alert("resetToken is " + model["token"]);
      }
    });
  }

  ChangePassword() {
    alert("ChangePassword event clicked");
    this.changePassword.token = this.resetToken;
    alert(this.changePassword);
    this.empService.ChangePasswordApiCall(this.changePassword).subscribe(res => {
      if (res != null) {
        this.status = res.status;
        this.message = res.message;
      }
    });
  }


  AddCountry() {
    this.empService.AddCountryApiCall(this.addCountries).subscribe(res => {
      if (res != null) {
        this.countryRespose.countryId = res.countryId,
          this.countryRespose.countryName = res.countryName
      }
    });
  }
}
