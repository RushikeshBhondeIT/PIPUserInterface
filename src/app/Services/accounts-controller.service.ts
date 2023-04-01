import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmEmail } from '../Models/confirm-email';
import { LogInModel } from '../Models/log-in-model';
import { RegisterUser } from '../Models/register-user.model';
import { TwoFactorAuth } from '../Models/two-factor-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangePassword } from '../Models/change-password';
import { AddCountry } from '../Models/add-country';
import { CountryResponse } from '../Models/country-response';

@Injectable({
  providedIn: 'root'
})
export class AccountsControllerService {
  header: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
  }

  private token: string;
  private loggedInUserName: string;
  private jwtHelper = new JwtHelperService();

  registerUser(registerUser: RegisterUser, role: string): Observable<any> {
    alert("service called")
    return this.http.post<any>("https://localhost:7115/RegisterAdmin?Role=" + role, registerUser);
  }

  confirmEmail(confirmEmail: ConfirmEmail): Observable<any> {
    alert("confirm service called");
    return this.http.get("https://localhost:7115/ConfirmEmail?token=" + confirmEmail.token + "&email=" + confirmEmail.email)
  }

  logInApiCall(logInModel: LogInModel): Observable<any> {
    alert("confirm service called");
    return this.http.post<any>("https://localhost:7115/LogIn", logInModel);

  }


  TFAlogInApiCall(twoFactorAuth: TwoFactorAuth): Observable<any> {
    alert("confirm service called");
    return this.http.get<any>("https://localhost:7115/LogIn-2FA?code=" + twoFactorAuth.otp + "&username=" + twoFactorAuth.userName);
  }

  ForgotPasswordApiCall(email: string): Observable<any> {
    alert("confirm service called");
    return this.http.get<any>("https://localhost:7115/Forgot-Password?email=" + email);
  }

  ResetPasswordApiCall(url :string): Observable<any> {
    alert("ResetPasswordApiCall service called");
    return this.http.get<any>(url);
  }


  ChangePasswordApiCall(changePassword: ChangePassword): Observable<any> {
    alert("confirm service called");
    return this.http.post<any>("https://localhost:7115/change-password",changePassword);
  }


  // GetAllEmployeeApiCall(): Observable<any> {
  //   alert("GetAllEmployeeApiCall service called");
  //   return this.http.get<any>("https://localhost:7115/GetAllEmployees");
  // }

  AddCountryApiCall(countryName:AddCountry): Observable<any> {
    alert("AddCountryApiCall service called");
    return this.http.post<any>("https://localhost:7115/AddCountries",countryName);
  }

  

}
