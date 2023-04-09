
import { Injectable } from '@angular/core';
import { LogInModel } from '../Models/log-in-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountsControllerService } from './accounts-controller.service';
import { Router } from '@angular/router';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private token: string;
  private tokenExpirationTimer: any;
  private expiration: string;
  private loggedInUserName: string;
  private jwtHelper = new JwtHelperService();
  constructor(private account: AccountsControllerService,private router:Router) {
  
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  getItem(key: string) {
    return localStorage.getItem(key);
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
    if (this.token != null && this.token != '') {
      const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
      newvalue = expiry * 1000 > Date.now();
      if (newvalue) {
        return true
      }
      else {
        return false;
      }
    }
    if (JSON.parse(this.token) == 'null' || JSON.parse(this.token) == 'Undefined') {  
      this.autologout(this.tokenExpirationTimer);
      return false;
    }
    else {
      this.autologout(this.tokenExpirationTimer);
      return false;
    }
  }
  
  autologout(expirationDuration: number) {
    console.log(expirationDuration);
    setTimeout(() => {
      this.LogOut();
      console.log('expirationDuration');
    }, expirationDuration);
  }

  public LogOut(): void {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('users');
    localStorage.removeItem('userName');
    this.router.navigateByUrl('/log-in');
  }

}


