import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsControllerService } from 'src/app/Services/accounts-controller.service';
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
  email: string;
  serverTime: string;
  userName:string;


  constructor(private local: LocalStorageService,
    private empService: EmployeeServiceService,
    private router: Router,
    private serverInfo: ServerInformationService,
    private accService: AccountsControllerService) {
    this.getServerTime();
    this.GetUserName();
  }

  GetUserName() {
    var email = localStorage.getItem('email');
    this.accService.GetUserDetailApiCall(email).subscribe(res => {
      if(res){
        this.userName=res.message;
      }
    })
  }

  // IsLoggedInCheck(): boolean {
  //   if (this.local.isLoggedIn() == true) {
  //     this.isLoggedIn = this.local.isLoggedIn()
  //     this.empService.GetAllEmployeeApiCall().subscribe(res => {
  //       if (res) {
  //         this.employees = res;
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
