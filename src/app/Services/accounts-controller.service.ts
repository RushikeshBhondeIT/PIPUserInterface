import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ConfirmEmail } from '../Models/confirm-email';
import { LogInModel } from '../Models/log-in-model';
import { RegisterUser } from '../Models/register-user.model';
import { TwoFactorAuth } from '../Models/two-factor-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangePassword } from '../Models/change-password';
import { AddCountry } from '../Models/add-country';
import { CountryResponse } from '../Models/country-response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountsControllerService {
  header: HttpHeaders = new HttpHeaders();
  baseUrl=environment.empUrl;
  constructor(private http: HttpClient) {
  }

  registerUser(registerUser: RegisterUser, role: string): Observable<any> {
    return this.http.post<any>(this.baseUrl+"RegisterAdmin?Role=" + role, registerUser);
  }

  confirmEmail(confirmEmail: ConfirmEmail): Observable<any> {
    return this.http.get(this.baseUrl+"ConfirmEmail?token=" + confirmEmail.token + "&email=" + confirmEmail.email);
  }

  logInApiCall(logInModel: LogInModel): Observable<any> {
    return this.http.post<any>(this.baseUrl+"LogIn", logInModel);
  }

  TFAlogInApiCall(twoFactorAuth: TwoFactorAuth): Observable<any> {
    return this.http.get<any>(this.baseUrl+"LogIn-2FA?code=" + twoFactorAuth.otp + "&username=" + twoFactorAuth.userName);
  }

  ForgotPasswordApiCall(email: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+"Forgot-Password?email=" + email);
  }

  ResetPasswordApiCall(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  ChangePasswordApiCall(changePassword: ChangePassword): Observable<any> {
    return this.http.post<any>(this.baseUrl+"change-password", changePassword);
  }

  AddCountryApiCall(countryName: AddCountry): Observable<any> {
    return this.http.post<any>(this.baseUrl+"AddCountries", countryName);
  }

  GetUserDetailApiCall(email: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "UserDetail?email="+ email);
  }

}
