import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from './Services/employee-service.service';
import { LocalStorageService } from './Services/local-storage.service';
import { ServerInformationService } from './Services/server-information.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'EmpPortal';
  isloggedin: boolean;
  name: string;
  isadmin: string;
  cartCount: number = 0;
  userId: number;
  searchItem: string;
  Employees: any;
  message: string;
  status: string;
  userName: string;
  serverTime: string;


  constructor(private local: LocalStorageService, private empService: EmployeeServiceService, private router: Router, private serverInfo: ServerInformationService) {
    this.isloggedin = this.IsLoggedIn();
    this.getServerTime();
    this.userName = localStorage.getItem('userName');
  }

  IsLoggedIn(): boolean {
    if (this.local.isLoggedIn() == true) {
      this.empService.GetAllEmployeeApiCall().subscribe(res => {
        if (res != null || res.status == "Success") {
          this.Employees = res;
          this.status = res.status;
          this.message = res.message;
        }
      });
      return false
    } else {
      this.Logout();
      return false;
    }

  }

  getServerTime() {
    this.serverInfo.GetServerTimeApiCall().subscribe(res => {
      if(res!= null){
        this.serverTime = res.message;
        this.local.setItem('serverTime',this.serverTime);
      }
    });
  }

  Logout() {
    this.local.LogOut();
    this.router.navigateByUrl('/log-in');
  }

  forGotPassword(){
    this.router.navigateByUrl('/forgot-password')
  }
  
}
