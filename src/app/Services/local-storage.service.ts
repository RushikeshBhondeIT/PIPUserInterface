
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmEmail } from '../Models/confirm-email';
import { LogInModel } from '../Models/log-in-model';
import { RegisterUser } from '../Models/register-user.model';
import { TwoFactorAuth } from '../Models/two-factor-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountsControllerService } from './accounts-controller.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private token: string;
  private tokenExpirationTimer: any;
  private expiration: string;
  private loggedInUserName: string;
  private jwtHelper = new JwtHelperService();
  constructor(private account: AccountsControllerService) {

  }



  public saveToken(token: string, expiration: string): void {
    this.token = token;
    this.expiration = expiration;
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', JSON.stringify(expiration));
  }

  public addUserToLocalStorage(user: LogInModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public GetUserFromLocalStorage(): LogInModel {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
    this.expiration = localStorage.getItem('expiration');
  }

  public getToken(): string {
    return this.token;
  }


  public isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    var newvalue;
    if (this.token != null && this.token !== '') {
      const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
      alert("1st:" + expiry);
      newvalue = expiry * 1000 > Date.now();
      if (newvalue) {
        alert("making a request" + newvalue);
        return false
      } else {
        alert("Navigate  to login" + newvalue);
        return true;
      }
    } else {
      this.autologout(this.tokenExpirationTimer);
      alert("NAVIGATE to login" + newvalue);
      return true;
    }
  }

  // logout() {
  //   this.user.next(null);
  //   this.router.navigate(['./auth']);
  //   //now that we are storing the token in the local storage, we will have to clear it as well while logging out otherwise it will keep user logged in forever even after logout or token expiry.

  //   //localStorage.clear();  //this is fine if we dont have any other data that we dont mind clearing.l otherwise we have to use other way to do it as below.
  //   localStorage.removeItem('userData');
  //   if (this.tokenExpirationTimer) {

  //     clearTimeout(this.tokenExpirationTimer);
  //   }
  //   this.tokenExpirationTimer = null;

  // }

  autologout(expirationDuration: number) {
    console.log(expirationDuration);
    //here is the timeout occurs then its fine since we are logged out. But when user maually logout, then this method and its times is still present. So we need to clear that as well.
    this.tokenExpirationTimer = setTimeout(() => {
      this.LogOut();


    }, expirationDuration);
  }

  public LogOut(): void {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('users');
  }

}


