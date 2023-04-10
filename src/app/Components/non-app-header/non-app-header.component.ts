import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';

@Component({
  selector: 'app-non-app-header',
  templateUrl: './non-app-header.component.html',
  styleUrls: ['./non-app-header.component.css']
})
export class NonAppHeaderComponent {
  title = 'EmpPortal';
  isLoggedIn: boolean;
  name: string;
  isAdmin: string;
  cartCount: number = 0;
  userId: number;
  searchItem: string;
  Employees: any;
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


  // IsLoggedInCheck(): boolean {
  //   if (this.local.isLoggedIn() == true) {
  //     this.isLoggedIn = this.local.isLoggedIn()
  //     this.empService.GetAllEmployeeApiCall().subscribe(res => {
  //       if (res) {
  //         this.Employees = res;
  //         this.status = res.status;
  //         this.message = res.message;
  //       }
  //     });
  //     return true
  //   } else {
  //     this.Logout();
  //     return false;
  //   }

  // }

  getServerTime() {
    this.serverInfo.GetServerTimeApiCall().subscribe(res => {
      if (res) {
        this.serverTime = res.message;
        this.local.setItem('serverTime', this.serverTime);
      }
    }, error => {
      console.log(error.message);
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
