import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'EmpPortal';
  isLoggedIn: boolean;
  name: string;
  isadmin: string;
  cartCount: number = 0;
  userId: number;
  searchItem: string;
  employees: any;
  message: string;
  status: string;
  userName: string;
  serverTime: string;


  constructor(private local: LocalStorageService,
    private empService: EmployeeServiceService,
    private router: Router,
    private serverInfo: ServerInformationService) {
    this.getServerTime();
    this.userName = localStorage.getItem('userName');

  }

  ngOninit() {
    this.getServerTime();
    this.userName = localStorage.getItem('email');
    this.isLoggedIn = this.IsLoggedInCheck();
  }
  GetUserName(){
  
  }

  IsLoggedInCheck(): boolean {
    if (this.local.isLoggedIn() == true) {
      this.isLoggedIn = this.local.isLoggedIn()
      this.empService.GetAllEmployeeApiCall().subscribe(res => {
        if (res) {
          this.employees = res;
          this.status = res.status;
          this.message = res.message;
        }
      });
      return true
    } else {
      this.Logout();
      return false;
    }
  }

  getServerTime() {
    this.serverInfo.GetServerTimeApiCall().subscribe(res => {
      if (res) {
        this.serverTime = res.message;
        this.local.setItem('serverTime', this.serverTime);
      }
    }, error => {
      console.log(error);
      this.serverInfo.showErrorMessage('error',
        error.error.message,
        'error',
        false,)
    });
  }

  Logout() {
    this.local.LogOut();
    this.router.navigateByUrl('/log-in');
  }

  forGotPassword() {
    this.router.navigateByUrl('/forgot-password')
  }
}
