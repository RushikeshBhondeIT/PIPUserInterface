import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EmployeeResponse } from 'src/app/Models/employee-response';
import { EmployeeServiceService } from 'src/app/Services/employee-service.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ServerInformationService } from 'src/app/Services/server-information.service';
import { EmployeeSharedService } from 'src/app/SharedServices/employee-shared.service';
import Swal from 'sweetalert2';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Employees: EmployeeResponse[] = [];
  message: string = ""
  status: string = ""
  employeeResponseObject: EmployeeResponse;
  // employeeObject: EmployeeResponse = new EmployeeResponse();
  // dtoptions: DataTables.Settings = {}
  // dtTrigger: Subject<any> = new Subject()
  constructor(private empService: EmployeeServiceService,
    private localStorage: LocalStorageService,
    private router: Router,
    private serverInfo: ServerInformationService) {
  }

  ngOnInit() {
    this.GetAllEmployee();
  }

  GetAllEmployee() {
    if (this.localStorage.isLoggedIn() == true) {
      this.empService.GetAllEmployeeApiCall().subscribe(res => {
        if (res != null || res.status == "Success") {
          this.Employees = res
          this.status = res.status;
          this.message = res.message;
          //this.dtTrigger.next(null);
        }
      });
      //alert("GetAll employee excecuted");
    }
  }

  CreateEmployee() {
    if (this.localStorage.isLoggedIn() == true) {
      this.router.navigateByUrl('/create-employee')
    }
  }

  Editinvoice(employee: EmployeeResponse) {
    if (this.localStorage.isLoggedIn() == true) {
      this.router.navigate(['/edit-employee'], { queryParams: { employeeId: employee.employeeId, employeeName: employee.employeeName, email: employee.email, countryName: employee.countryName, countryId: employee.countryId, address: employee.address, receiveNewsLetters: employee.receiveNewsLetters, gender: employee.gender, dateOfBirth: employee.dateOfBirth, age: employee.age } }); //Query string with navigate to send ProductId
    }
  }

  DeleteEmployee(employee: EmployeeResponse) {
    if (this.localStorage.isLoggedIn() == true) {
      this.empService.DeleteEmployeeApiCall(employee).subscribe(res => {
        this.message = res.message;
        if (res != null) {
          this.serverInfo.showSuccessMessage('Profile Deleted',
            this.message,
            'success',
            true,)
          this.router.navigateByUrl('/dashboard');
        }
        else {
          this.serverInfo.showErrorMessage('Error',
            this.message,
            'success',
            true,)
        }
      })
    }
  }

}
